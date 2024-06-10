import { Injectable } from '@nestjs/common';
import * as Prisma from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { assertExists } from '../utils/assert-exist';
import {
  FriendRequest,
  FriendRequestStatus,
  FriendRequestWithUsers,
} from './model/friend-request.model';

@Injectable()
export class FriendRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(senderId: string, receiverId: string) {
    const doc = await this.prisma.friendRequest.create({
      data: {
        senderId,
        receiverId,
      },
      include: {
        sender: true,
        receiver: true,
      },
    });

    return new FriendRequest({
      id: doc.id,
      createdAt: doc.createdAt,
      receiverId: doc.receiverId,
      senderId: doc.senderId,
      status: FriendRequestStatus.Pending,
      sender: doc.sender,
      receiver: doc.receiver,
    });
  }

  private parseRequestStatus(req: Prisma.FriendRequest): FriendRequestStatus {
    const status = FriendRequestStatus.Pending;
    if (req.accepted) return FriendRequestStatus.Accepted;
    if (req.accepted === false) return FriendRequestStatus.Declined; // accepted default value is null
    if (req.cancelled) return FriendRequestStatus.Cancelled;

    return status;
  }

  async getPendingReqsOfUser(userId: string) {
    const docs = await this.prisma.friendRequest.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
        accepted: null,
        cancelled: null,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });
    return docs.map(
      (doc) =>
        new FriendRequestWithUsers({
          id: doc.id,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
          receiverId: doc.receiverId,
          senderId: doc.senderId,
          sender: doc.sender,
          receiver: doc.receiver,
          status: this.parseRequestStatus(doc),
        }),
    );
  }

  async findFriendRequestBySenderAndReceiver(
    senderId: string,
    receiverId: string,
  ) {
    const req = await this.prisma.friendRequest.findFirst({
      where: {
        receiverId,
        senderId,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });
    assertExists(req);
    return new FriendRequest({
      id: req.id,
      createdAt: req.createdAt,
      receiverId: req.receiverId,
      senderId: req.senderId,
      sender: req.sender,
      receiver: req.receiver,
      status: this.parseRequestStatus(req),
    });
  }

  async findById(requestId: string) {
    const doc = await this.prisma.friendRequest.findUniqueOrThrow({
      where: {
        id: requestId,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });

    assertExists(doc);
    return new FriendRequestWithUsers({
      id: doc.id,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      receiverId: doc.receiverId,
      senderId: doc.senderId,
      sender: doc.sender,
      receiver: doc.receiver,
      status: this.parseRequestStatus(doc),
    });
  }

  async accept(id: string) {
    const doc = await this.prisma.friendRequest.update({
      where: { id },
      data: {
        accepted: true,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });

    assertExists(doc);
    return new FriendRequest({
      id: doc.id,
      createdAt: doc.createdAt,
      receiverId: doc.receiverId,
      senderId: doc.senderId,
      sender: doc.sender,
      receiver: doc.receiver,
      status: this.parseRequestStatus(doc),
    });
  }

  async decline(id: string) {
    const doc = await this.prisma.friendRequest.update({
      where: { id },
      data: {
        accepted: false,
      },
      include: {
        receiver: true,
        sender: true,
      },
    });

    assertExists(doc);
    return new FriendRequest({
      id: doc.id,
      createdAt: doc.createdAt,
      receiverId: doc.receiverId,
      senderId: doc.senderId,
      sender: doc.sender,
      receiver: doc.receiver,
      status: this.parseRequestStatus(doc),
    });
  }

  async cancel(id: string) {
    await this.prisma.friendRequest.delete({
      where: {
        id,
      },
    });

    return id;
  }
}
