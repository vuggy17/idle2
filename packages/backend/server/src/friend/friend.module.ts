import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { FriendController } from './friend.controller';
import { FriendRequestRepository } from './repositories/friend-request.repository';
import { FriendRequestService } from './services/friend-request.service';
import {
  FRIEND_REQUEST_QUEUE_NAME,
  FriendRequestQueueConsumer,
  FriendRequestQueueService,
} from './services/request-queue.service';

@Module({
  imports: [
    SocketModule,
    UsersModule,
    BullModule.registerQueue({
      name: FRIEND_REQUEST_QUEUE_NAME,
    }),
  ],
  providers: [
    FriendRequestRepository,
    FriendRequestQueueConsumer,
    FriendRequestQueueService,
    FriendRequestService,
  ],
  controllers: [FriendController],
})
export class FriendModule {}
