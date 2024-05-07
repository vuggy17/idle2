import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

import { User } from '../users/models/user.model';
import { RealtimeEvent } from './event';

@Injectable()
export class RealtimeMessageService {
  constructor(private readonly realtime: Pusher) {}

  sendFriendRequest(toUserId: string, req: unknown) {
    // return this.realtime.trigger('my-channel', 'my-event', {
    //   message: 'hello world',
    // });
    console.log(
      '🚀 ~ RealtimeMessageService ~ sendFriendRequest ~ toUserId:',
      toUserId,
    );
    return this.realtime.sendToUser(toUserId, 'new-friend-request', req);
  }

  authenticateUser(socketId: string, user: User) {
    return this.realtime.authenticateUser(socketId, user);
  }
}
