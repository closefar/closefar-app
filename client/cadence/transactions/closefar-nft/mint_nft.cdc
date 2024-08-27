/// This script uses the NFTMinter resource to mint a new NFT
/// It must be run with the account that has the minter resource
/// stored in /storage/NFTMinter

import FungibleToken from "../../contracts/utility/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"


transaction(
    recipient: Address,
    name: String,
    country: String,
    yearOfBirth: String,
    monthOfBirth: String,
    dayOfBirth: String,
    nationality: String,
    state: String,
    language: String,
    pronounce: String,
    tags: [String],
    job: String,
    url: String,
    description: String,
    thumbnail: String,
    cuts: [UFix64],
    royaltyDescriptions: [String],
    royaltyBeneficiaries: [Address]
) {

    /// local variable for storing the minter reference
    let minter: &CloseFarNFT.NFTMinter

    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.Receiver}

    prepare(signer: auth(BorrowValue) &Account) {

        let collectionData = CloseFarNFT.resolveContractView(resourceType: nil, viewType: Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?
            ?? panic("ViewResolver does not resolve NFTCollectionData view")
        
        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.storage.borrow<&CloseFarNFT.NFTMinter>(from: CloseFarNFT.MinterStoragePath)
            ?? panic("Account does not store an object at the specified path")

        // Borrow the recipient's public NFT collection reference
        self.recipientCollectionRef = getAccount(recipient).capabilities.borrow<&{NonFungibleToken.Receiver}>(
                collectionData.publicPath
            ) ?? panic("Could not get receiver reference to the NFT Collection")
    }

    pre {
        cuts.length == royaltyDescriptions.length && cuts.length == royaltyBeneficiaries.length: "Array length should be equal for royalty related details"
    }

    execute {

        // Create the royalty details
        var count = 0
        var royalties: [MetadataViews.Royalty] = []
        while royaltyBeneficiaries.length > count {
            let beneficiary = royaltyBeneficiaries[count]
            let beneficiaryCapability = getAccount(beneficiary).capabilities.get<&{FungibleToken.Receiver}>(
                    MetadataViews.getRoyaltyReceiverPublicPath()
                )

            assert(beneficiaryCapability.check(), message: "Beneficiary capability is not valid!")

            royalties.append(
                MetadataViews.Royalty(
                    receiver: beneficiaryCapability,
                    cut: cuts[count],
                    description: royaltyDescriptions[count]
                )
            )
            count = count + 1
        }


        // Mint the NFT and deposit it to the recipient's collection
        let mintedNFT <- self.minter.mintNFT(
            name: name,
            country: country,
            yearOfBirth: yearOfBirth,
            monthOfBirth: monthOfBirth,
            dayOfBirth: dayOfBirth,
            nationality: nationality,
            state: state,
            language: language,
            pronounce: pronounce,
            tags: tags,
            job: job,
            url: url,
            description: description,
            thumbnail: thumbnail,
            royalties: royalties
        )
        self.recipientCollectionRef.deposit(token: <-mintedNFT)
    }

}
