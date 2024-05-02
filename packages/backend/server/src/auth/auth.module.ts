import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Client } from 'node-appwrite';

import {
  AppwriteConfig,
  SecurityConfig,
} from '../common/configs/config.interface';
import {
  APPWRITE_CLIENT_FACTORY,
  APPWRITE_SERVER,
} from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';
import { appwriteClientFactory } from './models/appwrite-factory';
import { PasswordService } from './password.service';
import { SsoService } from './sso.service';
import { TokenService } from './token.service';

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
    SsoService,
    TokenService,
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
    {
      provide: APPWRITE_SERVER,
      useFactory: (configService: ConfigService) => () => {
        const config = configService.getOrThrow<AppwriteConfig>('appwrite');
        const client = new Client();
        client.setEndpoint(config.host);
        client.setProject(config.projectId);
        client.setKey(config.apiKey);

        return client;
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
