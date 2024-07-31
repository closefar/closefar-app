import CloseFarNFT from "../../contracts/utility/CloseFarNFT.cdc"    


  
    transaction(nftId: UInt64, name: String, description: String) {
        let nft: &CloseFarNFT.NFT
        prepare(signer: AuthAccount) {
            let collection = signer.borrow<&CloseFarNFT.Collection>(from: CloseFarNFT.CollectionStoragePath)
                ?? panic("Account does not store an object at the specified path")

            self.nft = collection.borrowCloseFarNFT(id: nftId)
                ?? panic("Account does not store nft with this id")

            self.nft.name = name
            self.nft.description =description
        }

        execute {
        }
    }