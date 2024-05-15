import type { SyncServer } from './server';
import type { DocStorageInner } from './storage';

type Job =
  | {
      type: 'connect';
      docId: string;
    }
  | {
      type: 'push';
      docId: string;
      update: Uint8Array;
      seqNum: number;
    }
  | {
      type: 'pull';
      docId: string;
    }
  | {
      type: 'pullAndPush';
      docId: string;
    }
  | {
      type: 'save';
      docId: string;
      update?: Uint8Array;
      serverClock: number;
    };

export class RemoteSyncPeer {
  constructor(
    private readonly storage: DocStorageInner,
    private readonly clientId: string,
    private readonly server: SyncServer,
  ) {}
}
