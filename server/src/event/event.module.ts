import { FlowService } from './../flow/flow.service';
import { ListingService } from 'src/listing/listing.service';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './block.schema';
import { Listing, ListingSchema } from 'src/listing/listing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
  ],
  providers: [EventService, ListingService, FlowService],
})
export class EventModule {}
