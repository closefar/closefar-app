import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

pub fun main(account: Address): [&CloseFarNFT.NFT] {
    let CollectionPublic = getAccount(account)
        .getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                CloseFarNFT.CollectionPublicPath
            )
        .borrow()
        ?? panic("Could not borrow public collection from address")

    let NFTIDs = CollectionPublic.getIDs()
    let NFTDetails: [&CloseFarNFT.NFT] = []
    
    for id in NFTIDs {
      var NFT = CollectionPublic.borrowCloseFarNFT(id: id)
      if (NFT != nil) {
        NFTDetails.append(NFT!)
      }
      else{
        continue
      }
    }
    
    return NFTDetails
}