/// This transaction is what an account would run
/// to set itself up to receive NFTs and installs the Storefront ressource in an account.


import NonFungibleToken from "../contracts/utility/NonFungibleToken.cdc"
import CloseFarNFT from "../contracts/utility/CloseFarNFT.cdc"
import MetadataViews from "../contracts/utility/MetadataViews.cdc"
import NFTStorefrontV2 from "../contracts/NFTStorefrontV2.cdc"


transaction {

    prepare(signer: auth(Storage,Capabilities) &Account) {
        //------------------- setup account --------------------------

        // Return early if the account already has a collection
        if signer.storage.borrow<&CloseFarNFT.Collection>(from: CloseFarNFT.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- CloseFarNFT.createEmptyCollection(nftType: Type<@CloseFarNFT.NFT>())

            // save it to the account
            signer.storage.save(<-collection, to: CloseFarNFT.CollectionStoragePath)
        }

        // create a public capability for the collection
        if signer.capabilities.exists(
                CloseFarNFT.CollectionPublicPath
            ) == false {
            let collectionCap = signer.capabilities.storage.issue<&{NonFungibleToken.CollectionPublic}>(CloseFarNFT.CollectionStoragePath)
            signer.capabilities.unpublish(CloseFarNFT.CollectionPublicPath)
            signer.capabilities.publish(collectionCap, at: CloseFarNFT.CollectionPublicPath)
        }

        // let providerPath: PrivatePath = /private/closeFarNFTProvider
        // if signer.getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(providerPath).check() == false {
        //     signer.unlink(/private/closeFarNFTProvider)
        //     signer.link<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(
        //         providerPath,
        //         target: CloseFarNFT.CollectionStoragePath
        //     )
        // }

        if signer.storage.borrow<&CloseFarNFT.NFTMinter>(from: CloseFarNFT.MinterStoragePath) == nil {
            let minter <- CloseFarNFT.createNFTMinter()
            signer.storage.save(<-minter, to: CloseFarNFT.MinterStoragePath)
        }
        //------------------- install storefront --------------------------

        // If the account doesn't already have a Storefront
        if signer.storage.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {

            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront()
            
            // save it to the account
            signer.storage.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)

            // create a public capability for the Storefront
            let collectionCap = signer.capabilities.storage.issue<&NFTStorefrontV2.Storefront>(NFTStorefrontV2.StorefrontStoragePath)
            signer.capabilities.publish(collectionCap, at: NFTStorefrontV2.StorefrontPublicPath)
        }
    }
}
