import {
  BadRequestException,
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
    const user = await this.authService.createUserFromToken(token);

    const tokens = this.authService.generateTokens({
      userId: user.id,
    });
    res.cookie('access_token', tokens.accessToken, {
      sameSite: 'lax',
      httpOnly: true,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      sameSite: 'lax',
      httpOnly: true,
    });
  }

  @Public()
  @Get('refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @Cookies('refresh_token') refreshToken: string,
  ) {
    const user = await this.authService.getUserFromToken(refreshToken);
    if (user) {
      const tokens = this.authService.generateTokens({ userId: user.id });
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

  @UseGuards(JwtAuthGuard)
  @Delete('credentials')
  clearCredentials(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    console.log('clear cred');
    return 'ok';
  }
}
