import NFTStorefrontV2 from "../contracts/NFTStorefrontV2.cdc"
import CloseFarNFT from "../contracts/utility/CloseFarNFT.cdc"

/// This script returns an array of all the duplicate listingIDs for a given nftID.
///
access(all) fun main(account: Address, nftID: UInt64, listingID: UInt64): [UInt64] {
    return getAccount(account).capabilities.borrow<&{NFTStorefrontV2.StorefrontPublic}>(
            NFTStorefrontV2.StorefrontPublicPath
        )?.getDuplicateListingIDs(nftType: Type<@CloseFarNFT.NFT>(), nftID: nftID, listingID: listingID)
        ?? panic("Could not borrow public storefront from address")
}
