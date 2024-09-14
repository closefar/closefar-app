/// This transaction withdraws an NFT from the signers collection and destroys it

import "NonFungibleToken"
import "MetadataViews"
import "CloseFarNFT"

transaction(id: UInt64) {

    /// Reference that will be used for the owner's collection
    let collectionRef: auth(NonFungibleToken.Withdraw) &CloseFarNFT.Collection

    prepare(signer: auth(BorrowValue) &Account) {
        let collectionData = CloseFarNFT.resolveContractView(resourceType: nil, viewType: Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?
            ?? panic("ViewResolver does not resolve NFTCollectionData view")
            
        // borrow a reference to the owner's collection
        self.collectionRef = signer.storage.borrow<auth(NonFungibleToken.Withdraw) &CloseFarNFT.Collection>(
                from: collectionData.storagePath
            ) ?? panic("Account does not store an object at the specified path")

    }

    execute {

        // withdraw the NFT from the owner's collection
        let nft <- self.collectionRef.withdraw(withdrawID: id)

        destroy nft
    }

    post {
        !self.collectionRef.getIDs().contains(id): "The NFT with the specified ID should have been deleted"
    }
}