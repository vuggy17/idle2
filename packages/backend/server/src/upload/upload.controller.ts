import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getImageUploadDirectSignature(
    @Query('folder') folder: string,
    @AuthUser() user: User,
  ) {
    return this.uploadService.generateUploadSignature({
      folder,
      publicId: user.id,
    });
  }
}
