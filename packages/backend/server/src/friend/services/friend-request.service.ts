import { ForbiddenException, Injectable } from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import { FriendRequestRepository } from '../repositories/friend-request.repository';
import { FriendRequestQueueService } from './request-queue.service';

@Injectable()
export class FriendRequestService {
  constructor(
    private readonly friendRequestQueue: FriendRequestQueueService,
    private readonly friendRequestRepository: FriendRequestRepository,
    private readonly userService: UsersService,
  ) {}

  async sendRequest(fromUserId: string, toUsername: string) {
    const target = await this.userService.findUserByUsername(toUsername);
    const req = await this.friendRequestRepository.create(
      fromUserId,
      target.id,
    );
    this.friendRequestQueue.schedule({ type: 'incoming', payload: req });
    return req;
  }

  getPendingRequest(userId: string) {
    return this.friendRequestRepository.getPendingReqsOfUser(userId);
  }

  async modifyRequest(
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
