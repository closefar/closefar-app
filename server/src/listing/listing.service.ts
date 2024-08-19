import { FlowService } from './../flow/flow.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing } from './listing.schema';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListingService {
  adminAddress = this.configService.get('ADMIN_ADDRESS');
  adminCommission = this.configService.get('ADMIN_COMMISSION');
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<Listing>,
    private readonly flowService: FlowService,
    private readonly configService: ConfigService,
  ) {}

  async create(createListing: Listing) {
    const newListing = new this.listingModel(createListing);
    await newListing.save();
    return newListing;
  }

  async createBaseOnEvent(
    data: Pick<Listing, 'owner' | 'nftId' | 'listingId' | 'txId' | 'price'>,
  ) {
    const existedListing = await this.listingModel.findOne({
      nftId: data.nftId,
    });
    if (existedListing) {
      console.log('Listing for this NFT have been already existed.');
      return;
    }

    const nftDetails = await this.flowService.getNftDetails(
      data.owner,
      data.nftId,
    );
    const listingDetails = await this.flowService.getListingDetails(
      data.owner,
      data.listingId,
    );

    console.log(nftDetails);
    console.log(this.adminAddress);
    console.log(this.adminCommission);

    let containAdminAddress = false;
    for (const cut of listingDetails.saleCuts) {
      if (cut.receiver.address === '0x' + this.adminAddress) {
        // (cut.amount * 100) / listingDetails.salePrice >= 10;
        containAdminAddress =
          (cut.amount * 100) / listingDetails.salePrice >= +this.adminCommission
            ? true
            : false;
      }
    }

    this.create({
      name: nftDetails.name,
      ...nftDetails.metadata,
      ...data,
      containAdminAddress,
    });
  }

  async findOneById(id: string) {
    return this.listingModel.findById(id);
  }

  async findOne(filter: Partial<Listing> & { _id?: string }) {
    return this.listingModel.findOne(filter);
  }

  async findByFilter(filter: Partial<Listing> & { _id?: string }) {
    return this.listingModel.find(filter);
  }

  async findAll() {
    return this.listingModel.find();
  }

  async updateById(id: string, data: UpdateListingDto) {
    return this.listingModel.updateOne({ _id: id }, data);
  }

  async deleteById(id: string) {
    return this.listingModel.deleteOne({ listingId: id });
  }

  //get 9 last listings base on createdAt field and in desc mode
  async get9LastListings() {
    return this.listingModel
      .find({ containAdminAddress: true })
      .sort({ createdAt: 'desc' });
  }

  async isListingsExist(ids: string[]) {
    const dictionaryOfNfts = {};

    const existedListings = await this.listingModel.find({
      nftId: { $in: ids },
    });

    // nft id
    const existedListingsNftId = existedListings.map(
      (listing) => listing.nftId,
    );
    // nft id and listing id
    const existedListingsId = {};
    existedListings.forEach((listing) => {
      existedListingsId[listing.nftId] = listing.listingId;
    });

    ids.map((id) => {
      existedListingsNftId.includes(id)
        ? (dictionaryOfNfts[id] = {
            isExist: true,
            listingId: existedListingsId[id],
          })
        : (dictionaryOfNfts[id] = { isExist: false });
    });

    return dictionaryOfNfts;
  }
}
