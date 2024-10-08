import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingModule } from './listing/listing.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { EventModule } from './event/event.module';
import { FlowModule } from './flow/flow.module';
import * as joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AwsModule } from './aws/aws.module';

const configModule = ConfigModule.forRoot({
  envFilePath: '.env.local',
  isGlobal: true,
  validationSchema: joi.object({
    ADMIN_ADDRESS: joi.string().required(),
    ADMIN_COMMISSION: joi.string().required(),
    NETWORK: joi.string().required(),
    MONGODB_URI: joi.string().required(),
    ADMIN_ACCOUNT_INDEX: joi.number().required(),
    ADMIN_PRIVATE_KEY: joi.string().required(),
    AWS_ACCESS_KEY_ID: joi.string().required(),
    AWS_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_S3_REGION: joi.string().required(),
  }),
});

const mongooseModule = MongooseModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get('MONGODB_URI'),
  }),
  inject: [ConfigService],
});

const flowModule = FlowModule.forRootAsync({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    network: configService.get('NETWORK'),
    minterFlowAddress: configService.get('ADMIN_ADDRESS'),
    minterAccountIndex: configService.get('ADMIN_ACCOUNT_INDEX'),
    minterPrivateKeyHex: configService.get('ADMIN_PRIVATE_KEY'),
    adminCommission: configService.get('ADMIN_COMMISSION'),
  }),
  inject: [ConfigService],
});

const jwtModule = JwtModule.registerAsync({
  global: true,
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '1d' },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    configModule,
    mongooseModule,
    ListingModule,
    // EventModule,
    flowModule,
    AuthModule,
    jwtModule,

    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
