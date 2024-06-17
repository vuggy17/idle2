import { injectable } from 'inversify';

import { MemoryMemento } from '../../../storage/memento';
import type { FriendRequest } from '../entites/requests';

@injectable()
export class FriendRequestStore {
  db = new MemoryMemento();

  watchFriendRequestIds() {
    return this.db.watch<string[]>('ids');
  }

  setRequests(data: FriendRequest[]) {
    data.forEach((i) => this.db.set<FriendRequest>(i.id, i));
    const ids = data.map((i) => i.id);
    this.db.set('ids', ids);
  }
}
