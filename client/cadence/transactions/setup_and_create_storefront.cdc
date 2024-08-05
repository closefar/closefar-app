/// This transaction is what an account would run
/// to set itself up to receive NFTs and installs the Storefront ressource in an account.


import NonFungibleToken from "../contracts/utility/NonFungibleToken.cdc"
import CloseFarNFT from "../contracts/utility/CloseFarNFT.cdc"
import MetadataViews from "../contracts/utility/MetadataViews.cdc"
import NFTStorefrontV2 from "../contracts/NFTStorefrontV2.cdc"


transaction {

    prepare(signer: AuthAccount) {
        //------------------- setup account --------------------------

        // Return early if the account already has a collection
        if signer.borrow<&CloseFarNFT.Collection>(from: CloseFarNFT.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- CloseFarNFT.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: CloseFarNFT.CollectionStoragePath)
        }

        // create a public capability for the collection
        if signer.getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                CloseFarNFT.CollectionPublicPath
            ).check() == false {
            signer.unlink(CloseFarNFT.CollectionPublicPath)
            signer.link<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                CloseFarNFT.CollectionPublicPath,
                target: CloseFarNFT.CollectionStoragePath
            )
        }

        let providerPath: PrivatePath = /private/closeFarNFTProvider
        if signer.getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(providerPath).check() == false {
            signer.unlink(/private/closeFarNFTProvider)
            signer.link<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(
                providerPath,
                target: CloseFarNFT.CollectionStoragePath
            )
        }

        if signer.borrow<&CloseFarNFT.NFTMinter>(from: CloseFarNFT.MinterStoragePath) == nil {
            let minter <- CloseFarNFT.createNFTMinter()
            signer.save(<-minter, to: CloseFarNFT.MinterStoragePath)
        }
        //------------------- install storefront --------------------------

        // If the account doesn't already have a Storefront
        if signer.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {

            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront()
            
            // save it to the account
            signer.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)

            // create a public capability for the Storefront
            signer.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)
        }
    }
}
