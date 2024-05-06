import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { GetUploadSignatureInput } from './dto/upload.input';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  @ApiProperty({
    name: 'invalidate',
    description:
      'Whether to expire the old image version on CDN network, detail: https://cloudinary.com/documentation/invalidate_cached_media_assets_on_the_cdn',
  })
  getImageUploadDirectSignature(
    @Query() { folder, invalidate }: GetUploadSignatureInput,
    @AuthUser() user: AuthUser,
  ) {
    return this.uploadService.generateUploadSignature({
      folder,
      invalidate,
      publicId: user.id,
    });
  }
}
