import { fetcher } from '@idle/http';
import type { FriendRequest, FriendRequestDataSource } from '@idle/infra';
import { injectable } from 'inversify';

@injectable()
export class CloudFriendRequestDataSource implements FriendRequestDataSource {
  async list(): Promise<FriendRequest[]> {
    const result = await fetcher.friend.getPendingFriendRequests();
    return result;
  }

  on(type: 'added' | 'removed', listener: (id: string) => void): () => void {
    throw new Error('Method not implemented.');
  }

  get(id: string): Promise<FriendRequest | null> {
    throw new Error('Method not implemented.');
  }

  accept(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  decline(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  withdraw(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async waitForConnected(signal: AbortSignal): Promise<void> {
    console.log('connected');
  }

  onInterrupted(cb: (reason: string) => void): void {
    throw new Error('Method not implemented.');
  }

  disconnect(): void {
    throw new Error('Method not implemented.');
  }
}
