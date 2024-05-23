import { idProp, Model, model, modelAction, prop } from 'mobx-keystone';

import { User } from './user';

@model('friend-request')
export class FriendRequest extends Model({
  id: idProp,
  senderId: prop<string>(),
  receiverId: prop<string>(),
  sender: prop<User | null>(null),
  receiver: prop<User | null>(null),
  status: prop<string>().withSetter(),
}) {
  @modelAction
  apply(data: FriendRequest) {
    this.senderId = data.senderId;
    this.receiverId = data.receiverId;
    this.sender = data.sender;
    this.receiver = data.receiver;
    this.status = data.status;

    return this;
  }
}
