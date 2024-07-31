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
  minter: string;
  mintedBlock: string;
  mintedTime: string;
}

export interface INftDetails {
  name: string;
  id: string;
  description: string;
  uuid: string;
  metadata: Metadata;
}
