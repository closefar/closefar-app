/// Script to get NFT IDs in an account's collection

import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"
import NonFungibleToken from "../../contracts/utility/NonFungibleToken.cdc"

access(all) fun main(address: Address): [UInt64] {
    let account = getAccount(address)

    let collectionRef = account.capabilities.borrow<&{NonFungibleToken.Collection}>(
            CloseFarNFT.CollectionPublicPath
        ) ?? panic("Could not borrow capability from collection at specified path")

    return collectionRef.getIDs()
}