import { idProp, Model, model, prop } from 'mobx-keystone';

@model('user')
export class User extends Model({
  id: idProp,
  avatar: prop<string>(),
  username: prop<string>(),
  displayName: prop<string>(),
}) {}
