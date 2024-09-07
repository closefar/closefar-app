import { IsString } from 'class-validator';

export class GetSignedUrl {
  @IsString()
  fileName: string;
}
