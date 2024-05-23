/* eslint-disable max-classes-per-file */
import type { FriendRequest } from '../../../data/domain/friend-request';
import { AsyncLock } from '../../../utils/async-lock';
import type { SyncServer } from '../server';

export class MiniSyncServer {
  lock = new AsyncLock();

  db = new Map<string, FriendRequest>();

  listeners = new Set<{
    cb: (updates: { reqId: string; data: FriendRequest }) => void;
    clientId: string;
  }>();

  client() {
    return new FriendRequestSyncServer(`${Date.now()}`, this);
  }
}

export class FriendRequestSyncServer implements SyncServer {
  constructor(
    private readonly id: string,
    private readonly server: MiniSyncServer,
  ) {}

  async list() {
    const keys = Array.from(this.server.db.keys());
    return keys;
  }

  async pull(reqId: string) {
    // eslint-disable-next-line
    using _lock = await this.server.lock.acquire();
    const doc = this.server.db.get(reqId);
    if (!doc) {
      return null;
    }
    return doc;
  }

  async push(reqId: string, data: FriendRequest) {
    // eslint-disable-next-line
    using _lock = await this.server.lock.acquire();
    this.server.db.set(reqId, data);

    for (const { cb, clientId } of this.server.listeners) {
      if (this.id !== clientId) {
        cb({ reqId, data });
      }
    }

    return reqId;
  }

  async subscribe(
    cb: (updates: { reqId: string; data: FriendRequest }) => void,
  ) {
    const listener = { cb, clientId: this.id };
    this.server.listeners.add(listener);

    return () => this.server.listeners.delete(listener);
  }

  waitForConnectingServer(signal: AbortSignal): Promise<void> {
    throw new Error('Method not implemented.');
  }

  disconnectServer(): void {
    throw new Error('Method not implemented.');
  }

  onInterrupted(cb: (reason: string) => void): void {
    throw new Error('Method not implemented.');
  }
}
