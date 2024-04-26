import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { assertExists } from '../utils/assert-exist';

@Injectable()
export class UploadService {
  async generateUploadSignature(paramToSign: {
    folder: string;
    publicId: string;
  }) {
    console.log('🚀 ~ UploadService ~ publicId:', paramToSign);
    const apiSecret = cloudinary.config().api_secret;
    const timestamp = Math.round(new Date().getTime() / 1000);

    assertExists(apiSecret);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: paramToSign.publicId,
        folder: paramToSign.folder, // file name must match client file name on request
      },
      apiSecret,
    );

    return {
      timestamp,
      signature,
    };
  }
}
