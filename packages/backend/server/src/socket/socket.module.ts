import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  controllers: [SocketController],
  exports: [SocketService],
  providers: [
    SocketService,
    {
      provide: Pusher,
      useFactory: async () => {
        const pusher = new Pusher({
          appId: '1799099',
          key: '162c287fc0e5ac069b59',
          secret: 'ffc86eee18fffd407cdf',
          cluster: 'ap1',
          useTLS: true,
        });

        return pusher;
      },
      inject: [ConfigService],
    },
  ],
})
export class SocketModule {}
