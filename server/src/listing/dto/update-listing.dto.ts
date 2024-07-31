import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly nftId: string;

  @IsString()
  @IsOptional()
  readonly listingId: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly owner: string;

  @IsString()
  @IsOptional()
  readonly txId: string;
}
