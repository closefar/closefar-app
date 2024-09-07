import { Body, Controller, Post } from '@nestjs/common';
import { AwsService } from './aws.service';
import { GetSignedUrl } from './dto/get-signed-url';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('get-signed-url')
  async getSignedUrl(@Body() data: GetSignedUrl) {
    return this.awsService.getSignedUrl(data.fileName);
  }
}
