/* eslint-disable max-classes-per-file */
import { idProp, Model, model, prop } from 'mobx-keystone';

export class FriendRequestList {
  private _requests: FriendRequest[] = [];

  constructor(workspaceId: string) {
    // load requests
  }

  get requests() {
    return this._requests;
  }

  addRequest(senderId: string, receiverId: string) {}

  acceptRequest(id: string) {}
}

@model('friend-request')
export class FriendRequest extends Model({
  id: idProp,
  senderId: prop<string>(),
  receiverId: prop<string>(),
  sender: prop(),
  receiver: prop(),
}) {}
