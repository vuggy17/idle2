import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { RealtimeMessageService } from '../rt-message/realtime-message.service';
import { FriendRequestWithUsers } from './model/friend-request.model';

@Processor('friend')
export class FriendConsumer {
  logger = new Logger(FriendConsumer.name);

  constructor(private readonly realtimeMessage: RealtimeMessageService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with data ${job.data}`,
    );
  }

  @Process('new_req')
  async handleNewFriendRequest(job: Job<FriendRequestWithUsers>) {
    const { data } = job;
    console.log(data);
    await this.realtimeMessage.sendFriendRequest(data.receiverId, data);
  }
}
