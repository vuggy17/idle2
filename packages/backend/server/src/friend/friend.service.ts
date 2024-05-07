import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { UsersService } from '../users/users.service';
import { FriendRequestRepository } from './friend-request.repository';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userService: UsersService,
    @InjectQueue('friend') private jq: Queue,
  ) {}

  async sendFriendRequest(fromUserId: string, toUsername: string) {
    const user = await this.userService.findUserByUsername(toUsername);
    try {
      const req = await this.friendRequestRepository.create(
        fromUserId,
        user.id,
      );

      this.jq.add('new_req', req);

      return req;
    } catch (error) {
      return this.friendRequestRepository.findFriendRequestBySenderAndReceiver(
        fromUserId,
        user.id,
      );
    }
  }

  getPendingFriendRequest(userId: string) {
    return this.friendRequestRepository.getPendingReqsOfUser(userId);
  }
}
