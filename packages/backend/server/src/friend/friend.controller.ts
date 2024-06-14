import { FriendRequestDTO, FriendRequestModifyDTO } from '@idle/model';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { SendFriendRequestInput } from './dto/send-friend-request.input';
import { FriendRequestService } from './services/friend-request.service';

@Controller('friend')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  // #region Friend request
  @Post('request')
  sendFriendRequest(
    @AuthUser() sender: AuthUser,
    @Body() body: SendFriendRequestInput,
  ) {
    if (sender.username === body.toUsername)
      throw new BadRequestException(
        'Cannot send friend request to self, try use another username instead',
      );
    return this.friendRequestService.sendRequest(sender.id, body.toUsername);
  }

  @Get('request')
  async getMyPendingFriendRequest(
    @AuthUser() user: AuthUser,
  ): Promise<FriendRequestDTO[]> {
    const requests = await this.friendRequestService.getPendingRequest(user.id);
    return requests.map((req) => ({
      ...req,
      createdAt: req.createdAt.getTime() / 1000,
      updatedAt: req.updatedAt.getTime() / 1000,
      sender: {
        ...req.sender,
        createdAt: req.createdAt.getTime() / 1000,
        updatedAt: req.updatedAt.getTime() / 1000,
      },
      receiver: {
        ...req.receiver,
        createdAt: req.createdAt.getTime() / 1000,
        updatedAt: req.updatedAt.getTime() / 1000,
      },
    }));
  }

  @Post('request/modify')
  async modifyRequest(
    @AuthUser() author: AuthUser,
    @Body() body: { id: string; action: 'accept' | 'decline' | 'cancel' },
  ): Promise<FriendRequestModifyDTO> {
    const request = await this.friendRequestService.modifyRequest(
      body.id,
      author.id,
      body.action,
    );

    return {
      ...request,
      createdAt: request.createdAt.getTime() / 1000,
      updatedAt: request.updatedAt.getTime() / 1000,
      sender: {
        ...request.sender,
        createdAt: request.createdAt.getTime() / 1000,
        updatedAt: request.updatedAt.getTime() / 1000,
      },
      receiver: {
        ...request.receiver,
        createdAt: request.createdAt.getTime() / 1000,
        updatedAt: request.updatedAt.getTime() / 1000,
      },
    };
  }
  // #endregion
}
