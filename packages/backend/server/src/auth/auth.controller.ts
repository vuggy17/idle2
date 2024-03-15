import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { HandshakeInput } from './dto/handshake.input';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('handshake')
  async handshake(
    @Res({ passthrough: true }) res: Response,
    @Body() { token, userId }: HandshakeInput,
  ) {
    // validate token
    const isValid = await this.authService.validateToken(token, userId);

    if (isValid) {
      res.cookie('access_token', token, {
        sameSite: 'lax',
        httpOnly: true,
      });
      res.cookie('user_id', userId, {
        sameSite: 'lax',
        httpOnly: true,
      });
    }
    return 1;
    throw new BadRequestException('Token invalid');
  }
}
