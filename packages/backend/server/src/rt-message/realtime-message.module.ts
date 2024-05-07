import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

import { RealtimeController } from './realtime.controller';
import { RealtimeMessageService } from './realtime-message.service';

@Module({
  controllers: [RealtimeController],
  exports: [RealtimeMessageService],
  providers: [
    RealtimeMessageService,
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
export class RealtimeMessageModule {}
