import * as fcl from "@onflow/fcl";

/**
 * purchase listing by id listingResourceID from storefrontAddress to currentUser
 * @param listingResourceID
 * @param storefrontAddress
 * @returns
 */
export const editNFT = (nftId: number) =>
  fcl.mutate({
    cadence: `
    import NFTStorefrontV2 from 0xf8d6e0586b0a20c7
    
    /// Transaction to facilitate the removal of listing by the
    /// listing owner.
    /// Listing owner should provide the 'listingResourceID' that
    /// needs to be removed.

    transaction(listingResourceID: UInt64) {
      const collectionPublic = signer.getCapability<&{NonFungibleToken.CollectionPublic, CloseFarNFT.CloseFarNFTCollectionPublic, MetadataViews.ResolverCollection}>(
        CloseFarNFT.CollectionPublicPath
    )
        }

        execute {
            self.storefront.removeListing(listingResourceID: listingResourceID)
        }
    }

    `,
    args: (arg, t) => [arg(nftId, t.UInt64)],
    limit: 999,
  });
