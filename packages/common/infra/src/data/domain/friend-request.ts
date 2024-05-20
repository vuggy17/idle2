import { idProp, Model, model, prop } from 'mobx-keystone';

import { User } from './user';

@model('friend-request')
export class FriendRequest extends Model({
  id: idProp,
  senderId: prop<string>(),
  receiverId: prop<string>(),
  sender: prop<User | null>(null),
  receiver: prop<User | null>(null),
  status: prop<string>(),
}) {}
