import { describe, expect, it } from 'vitest';

import { FriendRequest } from '../../../data/domain/friend-request';
import { ID } from '../../../utils/id';
import { RequestEngine } from '../engine';
import { MemoryFriendRequestStorage } from '../storage';

describe('friend request engine', () => {
  it('basic sync', async () => {
    const storage = new MemoryFriendRequestStorage();
    const engine = new RequestEngine(storage);

    const r1 = new FriendRequest({
      id: ID.unique(),
      receiverId: ID.unique(),
      senderId: ID.unique(),
      status: 'ss',
    });
    engine.addRequest(r1);
    engine.start();
    await engine.waitForSynced();

    expect(storage.docDb.keys().length).toBe(1);
    expect(storage.docDb.get<FriendRequest>(r1.id)?.id).toEqual(r1.id);
  });

  it('changes reflected in storage', async () => {
    const storage = new MemoryFriendRequestStorage();
    const engine = new RequestEngine(storage);

    const r1 = new FriendRequest({
      id: ID.unique(),
      receiverId: ID.unique(),
      senderId: ID.unique(),
      status: 'ss',
    });

    engine.addRequest(r1);
    engine.start();
    await engine.waitForSynced();
    r1.setStatus('pending');
    await engine.waitForSynced();

    expect(storage.docDb.get<FriendRequest>(r1.id)?.status).toEqual('pending');
  });
});
