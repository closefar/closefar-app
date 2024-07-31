import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateListingDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly url: string;

  @IsString()
  readonly nftId: string;

  @IsString()
  readonly listingId: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly owner: string;

  @IsString()
  @IsOptional()
  readonly txId: string;
}
