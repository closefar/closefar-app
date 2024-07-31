import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ListingDocument = HydratedDocument<Listing>;

@Schema({ timestamps: true })
export class Listing {
  @Prop({ required: true, type: 'String' })
  name: string;

  @Prop({ required: true, type: 'String' })
  url: string;

  @Prop({ required: true, type: 'String' })
  nftId: string;

  @Prop({ required: true, type: 'String' })
  listingId: string;

  @Prop({ required: true, type: 'number' })
  price: number;

  @Prop({ required: true, type: 'String' })
  owner: string;

  @Prop()
  txId: string;

  @Prop({ required: true, type: 'String' })
  country: string;

  @Prop({ required: true, type: 'String' })
  yearOfBirth: string;

  @Prop({ required: true, type: 'String' })
  monthOfBirth: string;

  @Prop({ required: true, type: 'String' })
  dayOfBirth: string;

  @Prop({ required: true, type: 'String' })
  nationality: string;

  @Prop({ required: true, type: 'String' })
  state: string;

  @Prop({ required: true, type: 'String' })
  language: string;

  @Prop({ required: true, type: 'String' })
  pronounce: string;

  @Prop({ required: true, type: [{ type: 'String' }] })
  tags: string[];

  @Prop({ required: true, type: 'String' })
  job: string;

  @Prop({ required: true, type: 'String' })
  minter: string;

  @Prop({ required: true, type: 'String' })
  mintedBlock: string;

  @Prop({ required: true, type: 'String' })
  mintedTime: string;

  @Prop({ required: true, type: 'Boolean' })
  containAdminAddress: boolean;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
