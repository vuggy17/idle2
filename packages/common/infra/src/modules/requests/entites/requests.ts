import { Unreachable } from '@idle/env/constant';
import { map } from 'rxjs';

import { LiveData } from '../../../livedata';
import type { FriendRequestStore } from '../stores/request';

export interface FriendRequest {
  id: string;
  createdAt: number;
  receiverId: string;
  senderId: string;
  sender: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    password: string | null;
    createdAt: number;
    updatedAt: number;
  };
  receiver: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    password: string | null;
    createdAt: number;
    updatedAt: number;
  };
  status: number;
}

// view <-> presenter <-> model <- store(data source)
// model
export class FriendRequestList {
  requests$: LiveData<FriendRequest[]>;

  constructor(private readonly store: FriendRequestStore) {
    this.requests$ = LiveData.from<FriendRequest[]>(
      this.store.watchFriendRequestIds().pipe(
        map((ids) => {
          if (!ids) return [] as FriendRequest[];
          return ids.map((id) => {
            const r = this.store.db.get<FriendRequest>(id);
            if (!r) throw new Unreachable(`No request with id: ${id}`);
            return r;
          });
        }),
      ),
      [],
    );
  }
}
