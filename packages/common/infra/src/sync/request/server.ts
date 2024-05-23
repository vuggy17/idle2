import type { FriendRequest } from '../../data/domain/friend-request';

export interface SyncServer {
  pull(reqId: string): Promise<FriendRequest | null>;

  push(reqId: string, data: FriendRequest): Promise<string>;

  subscribe(
    cb: (updates: { reqId: string; data: FriendRequest }) => void,
  ): Promise<() => void>;

  list(): Promise<string[]>;

  waitForConnectingServer(signal: AbortSignal): Promise<void>;
  disconnectServer(): void;
  onInterrupted(cb: (reason: string) => void): void;
}
