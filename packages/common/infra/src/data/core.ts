import { FriendRequestList } from './domain/invitation';

export class WorkspaceCore {
  _friendRequestList: FriendRequestList;

  get friendRequestList() {
    if (!this._friendRequestList) {
      this._friendRequestList = new FriendRequestList('asd');
    }
    return this._friendRequestList;
  }
}

const a = new WorkspaceCore();
