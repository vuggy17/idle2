import type { SnapshotOutOf } from 'mobx-keystone';

import type { FriendRequest } from '../../data/domain/friend-request';
import type { FriendRequestKV, KV, NumberKV } from '../../storage/kv';
import {
  type Memento,
  MemoryMemento,
  wrapMemento,
} from '../../storage/memento';
import { AsyncLock } from '../../utils/async-lock';
import { type EventBus, MemoryDocEventBus } from '../event';

// eslint-disable-next-line @typescript-eslint/naming-convention
class Keys {
  static SeqNum(docId: string) {
    return `${docId}:seqNum`;
  }

  static SeqNumPushed(docId: string) {
    return `${docId}:seqNumPushed`;
  }

  static ServerClockPulled(docId: string) {
    return `${docId}:serverClockPulled`;
  }

  static UpdatedTime(docId: string) {
    return `${docId}:updateTime`;
  }
}

export interface FriendRequestStorage {
  eventBus: EventBus;
  doc: FriendRequestKV;
  syncMetadata: KV<any>;
  serverClock: NumberKV;
}

export interface RequestStorage {
  name: string;
  readonly: boolean;
  get(key: string): Promise<FriendRequest | null>;
  set(key: string, value: FriendRequest): Promise<string>;
  delete(key: string): Promise<void>;
  list(): Promise<string[]>;
}

export class RequestStorageInner {
  public readonly eventBus: EventBus;

  constructor(public readonly behavior: FriendRequestStorage) {
    this.eventBus = this.behavior.eventBus;
  }

  loadRequestFromLocal(id: string, signal?: AbortSignal) {
    signal?.throwIfAborted();
    return this.behavior.doc.get(id);
  }

  async commitDocAsClientUpdate(
    docId: any,
    update: SnapshotOutOf<FriendRequest>,
    signal?: AbortSignal,
  ) {
    signal?.throwIfAborted();

    await this.behavior.doc.set(docId, update);
    return this.saveDocSeqNum(docId, 'auto');
  }

  saveDocSeqNum(docId: any, seqNum: 'auto' | number, signal?: AbortSignal) {
    signal?.throwIfAborted();
    return this.behavior.syncMetadata.transaction(async (transaction) => {
      const key = Keys.SeqNum(docId);
      const old: number = await transaction.get(key);
      if (seqNum === 'auto') {
        await transaction.set(key, old + 1);
        return old + 1;
      }
      if (old < seqNum) {
        await transaction.set(key, seqNum);
        return seqNum;
      }
      return old;
    });
  }
}

export class MemoryFriendRequestStorage implements FriendRequestStorage {
  private readonly memo: Memento = new MemoryMemento();

  eventBus = new MemoryDocEventBus();

  readonly lock = new AsyncLock();

  readonly docDb = wrapMemento(this.memo, 'doc:');

  readonly syncMetadataDb = wrapMemento(this.memo, 'syncMetadata:');

  readonly serverClockDb = wrapMemento(this.memo, 'serverClock:');

  constructor(memo?: Memento) {
    if (memo) {
      this.memo = memo;
    }
  }

  readonly doc = {
    transaction: async (cb) => {
      // eslint-disable-next-line
      using _lock = await this.lock.acquire();

      return cb({
        get: async (key) => this.docDb.get(key),
        set: async (key, value) => {
          this.docDb.set(key, value);
        },
        keys: async () => {
          return Array.from(this.docDb.keys());
        },
        clear: () => {
          this.docDb.clear();
        },
        del: (key) => {
          this.docDb.del(key);
        },
      });
    },
    get(key) {
      return this.transaction(async (tx) => tx.get(key));
    },
    set(key, value) {
      return this.transaction(async (tx) => tx.set(key, value));
    },
    keys() {
      return this.transaction(async (tx) => tx.keys());
    },
    clear() {
      return this.transaction(async (tx) => tx.clear());
    },
    del(key) {
      return this.transaction(async (tx) => tx.del(key));
    },
  } satisfies FriendRequestKV;

  readonly syncMetadata = {
    transaction: async (cb) => {
      // eslint-disable-next-line
      using _lock = await this.lock.acquire();
      return cb({
        get: async (key) => {
          return this.syncMetadataDb.get(key) ?? null;
        },
        set: async (key, value) => {
          this.syncMetadataDb.set(key, value);
        },
        keys: async () => {
          return Array.from(this.syncMetadataDb.keys());
        },
        clear: () => {
          this.syncMetadataDb.clear();
        },
        del: (key) => {
          this.syncMetadataDb.del(key);
        },
      });
    },
    get(key) {
      return this.transaction(async (tx) => tx.get(key));
    },
    set(key, value) {
      return this.transaction(async (tx) => tx.set(key, value));
    },
    keys() {
      return this.transaction(async (tx) => tx.keys());
    },
    clear() {
      return this.transaction(async (tx) => tx.clear());
    },
    del(key) {
      return this.transaction(async (tx) => tx.del(key));
    },
  } satisfies KV<any>;

  readonly serverClock = {
    transaction: async (cb) => {
      // eslint-disable-next-line
      using _lock = await this.lock.acquire();
      return cb({
        get: async (key) => {
          return this.syncMetadataDb.get(key) ?? null;
        },
        set: async (key, value) => {
          this.syncMetadataDb.set(key, value);
        },
        keys: async () => {
          return Array.from(this.syncMetadataDb.keys());
        },
        clear: () => {
          this.syncMetadataDb.clear();
        },
        del: (key) => {
          this.syncMetadataDb.del(key);
        },
      });
    },
    get(key) {
      return this.transaction(async (tx) => tx.get(key));
    },
    set(key, value) {
      return this.transaction(async (tx) => tx.set(key, value));
    },
    keys() {
      return this.transaction(async (tx) => tx.keys());
    },
    clear() {
      return this.transaction(async (tx) => tx.clear());
    },
    del(key) {
      return this.transaction(async (tx) => tx.del(key));
    },
  } satisfies NumberKV;
}
