import type { FriendRequest } from '../entites/requests';

export interface FriendRequestDataSource {
  list(): Promise<FriendRequest[]>;
  on(type: 'added' | 'removed', listener: (id: string) => void): () => void;
  get(id: string): Promise<FriendRequest | null>;
  accept(id: string): Promise<string>;
  decline(id: string): Promise<string>;
  withdraw(id: string): Promise<string>;

  waitForConnected(signal: AbortSignal): Promise<void>;
  onInterrupted(cb: (reason: string) => void): void;
  disconnect(): void;
}
