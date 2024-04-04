import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Client, Users } from 'node-appwrite';

import {
  AppwriteConfig,
  SecurityConfig,
} from '../common/configs/config.interface';
import { APPWRITE_CLIENT_FACTORY } from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';
import { appwriteClientFactory } from './models/appwrite-factory';
import { PasswordService } from './password.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        assertExists(securityConfig);
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    PasswordService,
    AuthRepository,
    {
      provide: APPWRITE_CLIENT_FACTORY,
      useFactory: (configService: ConfigService) => () => {
        const config = configService.getOrThrow<AppwriteConfig>('appwrite');
        return appwriteClientFactory(config);
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
