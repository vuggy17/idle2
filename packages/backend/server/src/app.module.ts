import { BullModule } from '@nestjs/bull';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './common/configs/config';
import { RedisConfig } from './common/configs/config.interface';
import { FriendModule } from './friend/friend.module';
import { SocketModule } from './socket/socket.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { assertExists } from './utils/assert-exist';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis');
        assertExists(redisConfig);

        return {
          redis: {
            host: redisConfig.host,
            port: redisConfig.port,
            password: 'mLvsK1iDPBNCavJ5d8l8mVCBeYMPo4sS',
          },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),

    AuthModule,
    UsersModule,
    UploadModule,
    FriendModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
