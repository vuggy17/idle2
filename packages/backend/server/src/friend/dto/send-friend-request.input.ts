import { IsString } from 'class-validator';

export class SendFriendRequestInput {
  @IsString()
  toUsername: string;
}
