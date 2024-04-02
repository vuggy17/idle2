import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Account, Client } from 'node-appwrite';

import { SecurityConfig } from '../common/configs/config.interface';
import { APPWRITE_CLIENT } from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    @Inject(APPWRITE_CLIENT) private readonly appwriteClient: Client,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  async validateUser(userId: string): Promise<User | null> {
    try {
      console.log('cccc');
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      assertExists(user);
      return user;
    } catch (error) {
      // check if whether they are guest
      // const sdk = new Users(this.appwriteClient);
      // const user = await sdk.get(userId);
      // return (user as unknown as User) || null;
      return null;
    }
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = (this.jwtService.decode(token) as any).userId || '';
    const user = await this.prisma.user.findUnique({ where: { id } });
    assertExists(user);
    return user;
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
      console.log('ccccc');
      throw new UnauthorizedException();
    }
  }

  async validateToken(token: string) {
    try {
      const auth = new Account(this.appwriteClient.setJWT(token));
      const user = await auth.get();
      return user;
    } catch (error) {
      return false;
    }
  }
}
