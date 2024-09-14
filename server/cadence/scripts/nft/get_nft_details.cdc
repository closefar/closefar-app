import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"
      
access(all) fun main(address: Address, id: UInt64): &{NonFungibleToken.NFT} {
    let account = getAccount(address)

    let CollectionPublic = account.capabilities.borrow<&{NonFungibleToken.Collection}>(
            CloseFarNFT.CollectionPublicPath
        ) ?? panic("Could not borrow capability from collection at this address")

      let NFT = CollectionPublic.borrowNFT(id) ?? panic("There is no NFT with this id")
    return NFT 
}