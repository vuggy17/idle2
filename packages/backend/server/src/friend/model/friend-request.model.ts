/* eslint-disable max-classes-per-file */
import { BaseModel } from '../../common/models/base.model';
import { User } from '../../users/models/user.model';

export enum FriendRequestStatus {
  Accepted,
  Declined,
  Cancelled,
  Pending,
}

export class FriendRequestWithUsers extends BaseModel {
  receiverId: string;

  senderId: string;

  receiver: User;

  sender: User;

  status: FriendRequestStatus;

  constructor(doc: Partial<FriendRequestWithUsers>) {
    super(doc);
    Object.assign(this, doc);
  }
}
export class FriendRequest extends BaseModel {
  receiverId: string;

  senderId: string;

  receiver?: User;

  sender?: User;

  status: FriendRequestStatus;

  constructor(doc: Partial<FriendRequest>) {
    super(doc);
    Object.assign(this, doc);
  }
}
