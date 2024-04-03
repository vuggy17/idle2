import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Account, Users } from 'node-appwrite';

import { SecurityConfig } from '../common/configs/config.interface';
import { APPWRITE_CLIENT_FACTORY } from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { AuthRepository } from './auth.repository';
import { SignupInput } from './dto/signup.input';
import { AppwriteFactoryFn } from './models/appwrite-factory';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly repository: AuthRepository,
    @Inject(APPWRITE_CLIENT_FACTORY)
    private readonly appwriteClient: AppwriteFactoryFn,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    const user = await this.repository.createUser({
      ...payload,
      password: hashedPassword,
    });

    return this.generateTokens({
      userId: user.id,
    });
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password!,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = await this.repository.findById(userId);
    return user;
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = (this.jwtService.decode(token) as any).userId || '';
    const user = await this.repository.findById(id);
    assertExists(user, 'No user found');
    return user;
  }

  async createUserFromToken(token: string): Promise<User> {
    const id = (this.jwtService.decode(token) as any).userId || '';
    const user = await this.repository.findById(id);
    if (user) {
      return user;
    }

    const sdk = new Users(this.appwriteClient());
    const appwriteUser = await sdk.get(id);
    const newUser = await this.repository.createUser({
      id: appwriteUser.$id,
      email: appwriteUser.email,
      password: appwriteUser.password,
      lastname: appwriteUser.name,
    });

    return newUser;
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    assertExists(securityConfig);
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
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
      throw new UnauthorizedException();
    }
  }

  async validateAppwriteToken(token: string) {
    try {
      const auth = new Account(this.appwriteClient().setJWT(token));
      const user = await auth.get();
      return user;
    } catch (error) {
      return false;
    }
  }
}
