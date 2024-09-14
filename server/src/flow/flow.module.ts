import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { ConfigurableModuleClass } from './flow.module-definition';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingModule } from 'src/listing/listing.module';
import { Block, BlockSchema } from './block.schema';

@Module({
  imports: [
    ListingModule,
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
  ],
  providers: [FlowService, EventService],
  exports: [FlowService],
})
// export class FlowModule {}
export class FlowModule extends ConfigurableModuleClass {}
