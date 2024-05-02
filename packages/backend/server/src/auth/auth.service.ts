import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { assertExists } from '../utils/assert-exist';
import { AuthRepository } from './auth.repository';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';
import { SsoService } from './sso.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly repository: AuthRepository,
    private readonly sso: SsoService,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const { firstname, lastname, ...data } = payload;
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    const user = await this.repository.createUser({
      email: data.email,
      name: `${firstname?.trim()} ${lastname?.trim()}`,
      password: hashedPassword,
    });

    return this.tokenService.generateTokens({
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

    return this.tokenService.generateTokens({
      userId: user.id,
    });
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = await this.repository.findById(userId);
    return user;
  }

  private async getOrCreateUser(token: string): Promise<User> {
    const ssoUser = await this.sso.getUserFromToken(token);

    const localUser = await this.repository.findById(ssoUser.$id);
    if (localUser) {
      return localUser;
    }

    return this.repository.createUser({
      id: ssoUser.$id,
      email: ssoUser.email,
      password: ssoUser.password,
      name: ssoUser.name,
    });
  }

  async authenticate(token: string) {
    const { id } = await this.getOrCreateUser(token);
    return this.tokenService.generateTokens({
      userId: id,
    });
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = (this.jwtService.decode(token) as any).userId || '';
    const user = await this.repository.findById(id);
    assertExists(user, new BadRequestException('Token invalid'));
    return user;
  }

  async refreshUserToken(token: string) {
    const user = await this.getUserFromToken(token);
    return this.tokenService.generateTokens({ userId: user.id });
  }
}
