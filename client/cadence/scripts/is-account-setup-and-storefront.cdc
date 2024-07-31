import NFTStorefrontV2 from "../contracts/NFTStorefrontV2.cdc"
import CloseFarNFT from "../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../contracts/utility/MetadataViews.cdc"

pub fun main(account: Address): {String: Bool} {
    let acct = getAccount(account)
    var status: {String: Bool} = {}

    status["setup"] = acct.getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
      CloseFarNFT.CollectionPublicPath
  ).check()
    
  status["storefront"] = acct.getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
      NFTStorefrontV2.StorefrontPublicPath
    ).check() 

    return status
}