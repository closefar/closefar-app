import { FlowService } from './../flow/flow.service';
import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from './listing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
  ],
  controllers: [ListingController],
  providers: [ListingService, FlowService],
  exports: [ListingService],
})
export class ListingModule {}
