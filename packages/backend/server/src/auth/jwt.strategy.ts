import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: JwtStrategy.extractAccessTokenFromCookie,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      // maybe they are a guest
      throw new UnauthorizedException('User not found, are you guest');
    }
    return user;
  }

  static extractAccessTokenFromCookie(req: any) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies.access_token;
    }
    return token;
  }
}
