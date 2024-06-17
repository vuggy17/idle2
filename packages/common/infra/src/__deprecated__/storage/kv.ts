import type { ModelData, SnapshotOutOf } from 'mobx-keystone';

import type { FriendRequest } from '../data/domain/friend-request';

export interface KV<P> extends KVBehavior<P> {
  transaction<T extends P>(
    cb: (transaction: KVBehavior<T>) => Promise<T>,
  ): Promise<T>;
}

export interface KVBehavior<T = any> {
  get(key: string): Promise<T | null> | T | null;
  set(key: string, value: T): Promise<void> | void;
  del(key: string): Promise<void> | void;
  keys(): Promise<string[]> | string[];
  clear(): Promise<void> | void;
}

export interface NumberKV extends NumberKVBehavior {
  transaction<T>(cb: (transaction: NumberKVBehavior) => Promise<T>): Promise<T>;
}

export interface NumberKVBehavior {
  get(key: string): Promise<number | null> | number | null;
  set(key: string, value: number): Promise<void> | void;
  del(key: string): Promise<void> | void;
  keys(): Promise<string[]> | string[];
  clear(): Promise<void> | void;
}

export interface FriendRequestKV extends FriendRequestKVBehavior {
  transaction<T>(
    cb: (transaction: FriendRequestKVBehavior) => Promise<T>,
  ): Promise<T>;
}

export interface FriendRequestKVBehavior {
  get(
    key: string,
  ):
    | Promise<SnapshotOutOf<FriendRequest> | null>
    | SnapshotOutOf<FriendRequest>
    | null;
  set(key: string, value: SnapshotOutOf<FriendRequest>): Promise<void> | void;
  del(key: string): Promise<void> | void;
  keys(): Promise<string[]> | string[];
  clear(): Promise<void> | void;
}
