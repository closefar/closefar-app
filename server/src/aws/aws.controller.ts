import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AwsService } from './aws.service';
import { GetSignedUrl } from './dto/get-signed-url';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @UseGuards(AuthGuard)
  @Post('get-signed-url')
  async getSignedUrl(@Body() data: GetSignedUrl) {
    return this.awsService.getSignedUrl(data.fileName);
  }
}
