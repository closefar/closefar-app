import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

access(all) fun main(address: Address): [&{NonFungibleToken.NFT}] {
    let CollectionPublic = getAccount(address)
        .capabilities.borrow<&{NonFungibleToken.CollectionPublic}>(
                CloseFarNFT.CollectionPublicPath
            )
        ?? panic("Could not borrow public collection from address")

    let NFTIDs = CollectionPublic.getIDs()
    let NFTDetails: [&{NonFungibleToken.NFT}] = []
    
    for id in NFTIDs {
      var NFT: &{NonFungibleToken.NFT}? = CollectionPublic.borrowNFT(id)
      if (NFT != nil) {
        NFTDetails.append(NFT!)
      }
      else{
        continue
      }
    }
    
    return NFTDetails
}