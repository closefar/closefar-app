export interface Metadata {
  country: string;
  yearOfBirth: string;
  monthOfBirth: string;
  dayOfBirth: string;
  nationality: string;
  state: string;
  language: string;
  pronounce: string;
  tags: string[];
  job: string;
  url: string;
  minter?: string;
  mintedBlock?: string;
  mintedTime?: string;
}

export interface INFT {
  name: string;
  id: string;
  uuid: string;
  metadata: Metadata;
}

export interface IListing extends Metadata {
  _id?: string;
  name: string;
  nftId: string;
  listingId: string;
  price: number;
  owner: string;
  txId?: string;
}
