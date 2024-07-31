import { FlowService } from './../flow/flow.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './block.schema';
import { ListingService } from 'src/listing/listing.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventService {
  private readonly stepSize: number = 200;
  private readonly stepTimeMs: number = 5000;
  private readonly adminAddress = this.configService.get('ADMIN_ADDRESS');
  private readonly eventNames: string[] = [
    'A.' + this.adminAddress + '.NFTStorefrontV2.ListingAvailable',
    'A.' + this.adminAddress + '.NFTStorefrontV2.ListingCompleted',
  ];
  private readonly adminCommission = this.configService.get('ADMIN_COMMISSION');

  constructor(
    @InjectModel(Block.name) private blockModel: Model<Block>,
    @Inject() private configService: ConfigService,
    private flowService: FlowService,
    private listingService: ListingService,
  ) {}

  async findOrCreateBlockCursor(lastestBlockHeight: number) {
    let blockCursor = await this.blockModel.findOne();
    if (!blockCursor) {
      blockCursor = new this.blockModel({
        currentBlockHeight: lastestBlockHeight,
      });
      await blockCursor.save();
    }
    return blockCursor;
  }

  sortEvents(events: any[]) {
    events.sort((event1, event2) => {
      // order events by block height ascending
      if (event1.blockHeight > event2.blockHeight) {
        return 1;
      } else if (event1.blockHeight < event2.blockHeight) {
        return -1;
      }

      // if events are on the same block, order by transaction index
      if (event1.transactionIndex > event2.transactionIndex) {
        return 1;
      } else if (event1.transactionIndex < event2.transactionIndex) {
        return -1;
      }

      // if events are on the same transaction, order by event index
      if (event1.eventIndex > event2.eventIndex) {
        return 1;
      } else if (event1.eventIndex < event2.eventIndex) {
        return -1;
      }
      return 0;
    });
  }

  async poll() {
    try {
      const lastestBlockHeight = await this.flowService.getLatestBlockHeight();

      // if blockCursor does not exist in DB (1st instantiation of application), create one with lastest block height
      const blockCursor =
        await this.findOrCreateBlockCursor(lastestBlockHeight);

      if (!blockCursor || !blockCursor._id) {
        throw new Error('Could not get block cursor due to database error.');
      }

      // currentBlockHeight in the DB will equal the toBlock of the previous blockrange fcl query.
      // increment fromBlock by 1 for next window.
      const fromBlock = blockCursor.currentBlockHeight + 1;
      let toBlock = lastestBlockHeight;

      // on 1st iteration, fromBlock will be greater than toBlock due to newly inserted row.
      if (fromBlock > toBlock) {
        // fromBlock = toBlock;
        setTimeout(() => this.poll(), 5000);
        return;
      }

      // getEventsAtBlockHeightRange() has a block limit of 250 blocks.
      // If the range exceeds the limit of 200 then hard cap the block search range
      if (fromBlock + this.stepSize < toBlock) {
        toBlock = fromBlock + this.stepSize;
      }

      console.log(
        `Checking block range: fromBlock=${fromBlock} toBlock=${toBlock}`,
      );

      // iterate over eventNames and fetch events for block range
      const events = [];
      for (const eventName of this.eventNames) {
        const decoded = await this.flowService.getEvent({
          eventName,
          fromBlock,
          toBlock,
        });
        if (decoded.length > 0) {
          events.push(...decoded);
        }
      }

      if (events.length > 0) {
        console.log(`Found ${events.length} events in block range`);
        this.sortEvents(events);

        // update database in order of events
        for (const event of events) {
          await this.onEvent(event);
        }
      }

      // Record the last block queried
      await this.blockModel.findByIdAndUpdate(blockCursor._id, {
        currentBlockHeight: toBlock,
      });
    } catch (error) {
      console.error(error);
    } finally {
      // recursively call self to continue polling
      setTimeout(() => this.poll(), this.stepTimeMs);
    }
  }

  async onEvent(event: any) {
    console.log(event);
    switch (event.type) {
      case 'A.' + this.adminAddress + '.NFTStorefrontV2.ListingAvailable':
        console.log(event.type);
        await this.listingService.createBaseOnEvent({
          listingId: event.data.listingResourceID,
          nftId: event.data.nftID,
          owner: event.data.storefrontAddress,
          price: event.data.salePrice,
          txId: event.transactionId,
        });
        break;

      case 'A.' + this.adminAddress + '.NFTStorefrontV2.ListingCompleted':
        await this.listingService.deleteById(event.data.listingResourceID);
        break;

      default:
        break;
    }
  }
}
