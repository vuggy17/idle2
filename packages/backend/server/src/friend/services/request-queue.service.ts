import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job as BullJob, Queue } from 'bull';

import { SocketService } from '../../socket/socket.service';
import { FriendRequestWithUsers } from '../model/friend-request.model';

export type Job =
  | {
      type: 'incoming';
      payload: FriendRequestWithUsers;
    }
  | { type: 'outgoing'; payload: FriendRequestWithUsers };

export const FRIEND_REQUEST_QUEUE_NAME = 'friend-request';

@Injectable()
export class FriendRequestQueueService {
  constructor(
    @InjectQueue(FRIEND_REQUEST_QUEUE_NAME) private readonly queue: Queue,
  ) {}

  schedule(job: Job) {
    this.queue.add(job.type, job);
  }
}

@Processor(FRIEND_REQUEST_QUEUE_NAME)
export class FriendRequestQueueConsumer {
  logger = new Logger(FriendRequestQueueConsumer.name);

  constructor(private readonly realtimeMessage: SocketService) {}

  @OnQueueActive()
  onActive(job: BullJob) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: BullJob) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}`,
    );
  }

  @Process('incoming')
  async handleNewFriendRequest(job: BullJob<Job & { type: 'incoming' }>) {
    const { payload } = job.data;
    await this.realtimeMessage.sendFriendRequest(payload.receiverId, payload);
  }
}
