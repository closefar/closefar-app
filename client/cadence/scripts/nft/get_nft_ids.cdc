import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

pub fun main(account: Address): [UInt64] {
    let CollectionPublic = getAccount(account)
        .getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                CloseFarNFT.CollectionPublicPath
            )
        .borrow()
        ?? panic("Could not borrow public collection from address")

    log(CollectionPublic.getIDs())
  
    
    return CollectionPublic.getIDs()
}