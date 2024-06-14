import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

import { User } from '../users/models/user.model';
import { SocketEvent } from './event';

@Injectable()
export class SocketService {
  constructor(private readonly pusher: Pusher) {}

  sendFriendRequest(toUserId: string, payload: unknown) {
    // return this.realtime.trigger('my-channel', 'my-event', {
    //   message: 'hello world',
    // });
    console.log(
      '🚀 ~ RealtimeMessageService ~ sendFriendRequest ~ toUserId:',
      toUserId,
    );
    return this.pusher.sendToUser(
      toUserId,
      SocketEvent.IncomingFriendRequest,
      payload,
    );
  }

  authenticateUser(socketId: string, user: User) {
    return this.pusher.authenticateUser(socketId, user);
  }
}
