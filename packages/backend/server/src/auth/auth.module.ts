import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Client } from 'node-appwrite';

import {
  AppwriteConfig,
  SecurityConfig,
} from '../common/configs/config.interface';
import { APPWRITE_CLIENT } from '../common/configs/injection-token';
import { assertExists } from '../utils/assert-exist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';
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
    {
      provide: APPWRITE_CLIENT,
      useFactory: (configService: ConfigService) => {
        const appwriteConfig =
          configService.getOrThrow<AppwriteConfig>('appwrite');

        const client = new Client();
        client.setEndpoint(appwriteConfig.host);
        client.setProject(appwriteConfig.projectId);
        client.setKey(appwriteConfig.apiKey);

        return client;
      },
      inject: [ConfigService],
      scope: Scope.TRANSIENT,
    },
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
