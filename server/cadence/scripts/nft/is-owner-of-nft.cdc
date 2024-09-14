import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/utility/MetadataViews.cdc"

access(all) fun main(address: Address, nftId: UInt64): Bool {
    let CollectionPublic = getAccount(address)
        .capabilities.borrow<&{NonFungibleToken.CollectionPublic}>(
                CloseFarNFT.CollectionPublicPath
            )
        ?? panic("Could not borrow public collection from address")

    return CollectionPublic.getIDs().contains(nftId)
}