import NFTStorefrontV2 from "../contracts/NFTStorefrontV2.cdc"
import CloseFarNFT from "../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../contracts/utility/MetadataViews.cdc"

access(all) fun main(account: Address): {String: Bool} {
    let acct = getAccount(account)
    var status: {String: Bool} = {}

    status["setup"] = acct.capabilities.exists(
      CloseFarNFT.CollectionPublicPath
    )
    
    status["storefront"] = acct.capabilities.exists(
      NFTStorefrontV2.StorefrontPublicPath
    )
     

    return status
}