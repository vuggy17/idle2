import { Model, model, prop } from 'mobx-keystone';

import { FriendRequestList } from './domain/invitation';

export class WorkspaceCore {
  _friendRequestList: FriendRequestList;

  get _friendRequestList() {
    if (!this._friendRequestList) {
      this._friendRequestList = new FriendRequestList();
    }
  }
}

const a = new WorkspaceCore();
