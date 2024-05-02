import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Cookies } from '../common/decorators/cookie-decorator';
import { Public } from '../common/decorators/public-route.decorator';
import { AuthService } from './auth.service';
import { AuthenticateInput } from './dto/authenticate.input';
import { JwtAuthGuard } from './jwt-auth-guard';
import { SsoService } from './sso.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly ssoService: SsoService,
  ) {}

  @Public()
  @Post('authenticate')
  async generateTokens(
    @Res({ passthrough: true }) res: Response,
    @Body() { token, userId }: AuthenticateInput,
  ) {
    try {
      const tokens = await this.authService.authenticate(token);
      res.cookie('access_token', tokens.accessToken, {
        sameSite: 'lax',
        httpOnly: true,
      });
      res.cookie('refresh_token', tokens.refreshToken, {
        sameSite: 'lax',
        httpOnly: true,
      });
    } catch (error) {
      console.log(error)
      await this.ssoService.listSession(userId);

      await this.ssoService.deleteCurrentSession(userId);
    }
  }

  @Public()
  @Get('refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token') token: string,
  ) {
    const tokens = await this.authService.refreshUserToken(token);
    res.cookie('access_token', tokens.accessToken, {
      sameSite: 'lax',
      httpOnly: true,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      sameSite: 'lax',
      httpOnly: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('credentials')
  clearCredentials(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return 'credentials deleted';
  }
}
