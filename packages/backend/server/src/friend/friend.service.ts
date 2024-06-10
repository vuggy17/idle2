import { InjectQueue } from '@nestjs/bull';
import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async modifyFriendRequest(
    requestId: string,
    authorId: string,
    action: 'accept' | 'decline' | 'cancel',
  ) {
    // only receiver can accept/decline
    // only sender can cancel
    const request = await this.friendRequestRepository.findById(requestId);
    if (
      (action === 'accept' || action === 'decline') &&
      authorId === request.senderId
    ) {
      throw new ForbiddenException(
        'Invalid action, sender cannot accept or decline friend request',
      );
    }
    if (action === 'cancel' && authorId === request.receiverId) {
      throw new ForbiddenException(
        'Invalid action, receiver of an friend request cannot withdraw it',
      );
    }

    switch (action) {
      case 'accept':
        await this.friendRequestRepository.accept(request.id);
        break;
      case 'decline':
        await this.friendRequestRepository.decline(request.id);
        break;
      case 'cancel':
        await this.friendRequestRepository.cancel(request.id);
        break;
      default:
        throw new ForbiddenException('[Friend request modify]: Unknown action');
    }

    return request;
  }
}
