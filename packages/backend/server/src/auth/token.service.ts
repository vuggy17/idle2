import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { SecurityConfig } from '../common/configs/config.interface';
import { assertExists } from '../utils/assert-exist';
import { Token } from './models/token.model';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    assertExists(securityConfig);
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException('Cannot refresh token, try login again');
    }
  }
}
