import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

import { CloudinaryConfig } from '../common/configs/config.interface';
import { CLOUDINARY } from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [],
  providers: [
    UploadService,
    {
      provide: CLOUDINARY,
      useFactory: async (configService: ConfigService) => {
        const cloudinaryConfig =
          configService.get<CloudinaryConfig>('cloudinary');
        assertExists(cloudinaryConfig);
        return v2.config({
          cloud_name: cloudinaryConfig.cloudName,
          api_key: cloudinaryConfig.apiKey,
          api_secret: cloudinaryConfig.apiSecret,
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [UploadController],
})
export class UploadModule {}
