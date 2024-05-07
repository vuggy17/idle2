import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { RealtimeMessageModule } from '../rt-message/realtime-message.module';
import { UsersModule } from '../users/users.module';
import { FriendController } from './friend.controller';
import { FriendConsumer } from './friend.processor';
import { FriendService } from './friend.service';
import { FriendRequestRepository } from './friend-request.repository';

@Module({
  imports: [
    RealtimeMessageModule,
    UsersModule,
    BullModule.registerQueue({
      name: 'friend',
    }),
  ],
  providers: [FriendService, FriendRequestRepository, FriendConsumer],
  controllers: [FriendController],
})
export class FriendModule {}
