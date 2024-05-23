/* eslint-disable no-await-in-loop */
import { map } from 'rxjs';

import type { FriendRequest } from '../../data/domain/friend-request';
import { LiveData } from '../../livedata';
import { LocalSyncEngine } from './local';
import type { FriendRequestStorage } from './storage';
import { RequestStorageInner } from './storage';

const logger = console;

export class RequestEngine {
  private storage: RequestStorageInner;

  private local: LocalSyncEngine;

  abort = new AbortController();

  engineStatus$ = LiveData.computed((get) => {
    const localState = get(this.local.status$);
    // if (this.remotePart) {
    //   const remoteState = get(this.remotePart?.engineState$);
    //   return {
    //     total: remoteState.total,
    //     syncing: remoteState.syncing,
    //     saving: localState.syncing,
    //     retrying: remoteState.retrying,
    //     errorMessage: remoteState.errorMessage,
    //   };
    // }
    return {
      total: localState.total,
      syncing: localState.syncing,
      saving: localState.syncing,
      retrying: false,
      errorMessage: null,
    };
  });

  constructor(storage: FriendRequestStorage) {
    this.storage = new RequestStorageInner(storage);
    this.local = new LocalSyncEngine(this.storage);
  }

  start() {
    this.abort.abort('MANUALLY_STOP');
    this.abort = new AbortController();
    Promise.all([
      this.local.start(this.abort.signal),
      // this.remotePart?.mainLoop(this.abort.signal),
    ]).catch((err) => {
      if (err === 'MANUALLY_STOP') {
        return;
      }
      logger.error('Doc engine error', err);
    });
    return this;
  }

  stop() {
    this.abort?.abort();
  }

  waitForSynced() {
    return new Promise<void>((resolve) => {
      this.engineStatus$
        .pipe(map((state) => state.syncing === 0 && state.saving === 0))
        .subscribe((synced) => {
          if (synced) {
            resolve();
          }
        });
    });
  }

  addRequest(req: FriendRequest) {
    this.local.actions.addRequest(req);
  }
}
