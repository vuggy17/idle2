import type { Storage } from './storage';

export class LocalSyncPeer {
  storage: Storage;

  constructor(private readonly clientId: string) {}

  mainLoop() {}
}
