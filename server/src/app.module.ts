import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingModule } from './listing/listing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { FlowModule } from './flow/flow.module';
import * as joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      validationSchema: joi.object({
        ADMIN_ADDRESS: joi.string().required(),
        ADMIN_COMMISSION: joi.string().required(),
        NETWORK: joi.string().required(),
        MONGODB_URI: joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ListingModule,
    EventModule,
    FlowModule,
    UploadsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images',
      renderPath: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
