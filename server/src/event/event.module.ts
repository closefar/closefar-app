import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Block, BlockSchema } from './block.schema';
import { ListingModule } from 'src/listing/listing.module';

@Module({
  imports: [
    ListingModule,
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
  ],
  providers: [EventService],
})
export class EventModule {}
