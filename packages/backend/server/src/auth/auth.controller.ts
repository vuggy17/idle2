import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Public } from '../common/decorators/public-route.decorator';
import { AuthService } from './auth.service';
import { AuthenticateInput } from './dto/authenticate.input';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Public()
  @Post('authenticate')
  async generateTokens(
    @Res({ passthrough: true }) res: Response,
    @Body() { token }: AuthenticateInput,
  ) {
    // validate token
    const user = await this.authService.validateToken(token);

    if (user) {
      const tokens = this.authService.generateTokens({ userId: user.$id });
      res.cookie('access_token', tokens.accessToken, {
        sameSite: 'lax',
        httpOnly: true,
      });
      res.cookie('refresh_token', tokens.refreshToken, {
        sameSite: 'lax',
        httpOnly: true,
      });
    } else throw new BadRequestException('Token invalid');
  }
}
