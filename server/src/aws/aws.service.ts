import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly s3Client = new S3({
    region: this.configService.get('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  constructor(private readonly configService: ConfigService) {}

  // async upload(fileName: string, file: Buffer) {
  //   return this.s3Client
  //     .upload({
  //       Bucket: '',
  //       Key: fileName,
  //       Body: file,
  //     })
  //     .promise();
  // }

  //axios.put(uploadUrl,file)
  async getSignedUrl(fileName: string) {
    const fileType = fileName.split('.').pop();
    const key = `${uuidv4()}-${Date.now()}.${fileName}`;
    console.log('get key for uploading file: ' + key);

    const uploadUrl = this.s3Client.getSignedUrl('putObject', {
      Bucket: 'testnet-closefar',
      Key: key,
      Expires: 60,
      ContentType: 'video/' + fileType,
    });
    return { uploadUrl, key };
  }
}
