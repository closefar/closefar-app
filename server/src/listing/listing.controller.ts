import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  // @Post()
  // async createListing(@Body() createListing: CreateListingDto) {
  //   const listing = await this.listingService.create(createListing);
  //   return listing;
  // }

  // receive list of nft's ids and return if this id is in listing or not
  @Get('/is-listings-exist')
  async isListingsExist(@Query('ids') listingsId: string[]) {
    return await this.listingService.isListingsExist(listingsId);
  }

  @Get('get-9-last-listings')
  async get9LastListings() {
    const listings = await this.listingService.get9LastListings();
    return listings;
  }

  @Get('listing-details/:id')
  async getListingById(@Param('id') id: string) {
    const listing = await this.listingService.findOne({
      _id: id,
      containAdminAddress: true,
    });
    return listing;
  }

  @Get(':address')
  async getAllListingOfUser(@Param('address') address: string) {
    const listings = await this.listingService.findByFilter({
      owner: address,
      containAdminAddress: true,
    });
    return listings;
  }

  // @UseGuards(AuthGuard)
  @Get()
  async getAllListing() {
    const listings = await this.listingService.findByFilter({
      containAdminAddress: true,
    });
    return listings;
  }

  // @Patch()
  // async updateListing(@Body() updateListing: UpdateListingDto) {
  //   const listing = await this.listingService.create(updateListing);
  //   return listing;
  // }

  // @Delete(':id')
  // async deleteListing(@Param('id') id: string) {
  //   const listing = await this.listingService.deleteById(id);
  //   return listing;
  // }
}
