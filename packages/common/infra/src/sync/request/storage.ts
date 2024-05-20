import { difference } from 'lodash-es';
import type { FriendRequest } from '../../data/domain/friend-request';
import type { Memento } from '../../storage/memento';

export interface RequestStorage {
  name: string;
  readonly: boolean;
  get(key: string): Promise<FriendRequest | null>;
  set(key: string, value: FriendRequest): Promise<string>;
  delete(key: string): Promise<void>;
  list(): Promise<string[]>;
}

export class MemoryRequestStorage implements RequestStorage {
  name = 'memory-storage';
  readonly = false;
  constructor(private readonly state: Memento) {}

  get(key: string) {
    return Promise.resolve(this.state.get<FriendRequest>(key) ?? null);
  }
  set(key: string, value: FriendRequest) {
    this.state.set(key, value);

    const list = this.state.get<Set<string>>('list') ?? new Set<string>();
    list.add(key);
    this.state.set('list', list);

    return Promise.resolve(key);
  }
  delete(key: string) {
    this.state.set(key, null);

    const list = this.state.get<Set<string>>('list') ?? new Set<string>();
    list.delete(key);
    this.state.set('list', list);

    return Promise.resolve();
  }
  list() {
    const list = this.state.get<Set<string>>('list');
    return Promise.resolve(list ? Array.from(list) : []);
  }
}

const logger = console;

export class RequestEngine {
  private abort: AbortController | null = null;

  constructor(
    private readonly local: RequestStorage,
    private readonly remotes: RequestStorage[] = [],
  ) {}

  start() {
    if (this.abort) {
      return;
    }

    this.abort = new AbortController();
    const signal = this.abort.signal;
    const sync = () => {
      if (signal.aborted) return;

      this.sync()
        .catch((err) => console.log('sync friend request err', err))
        .finally(() => {
          setTimeout(sync, 60 * 1000);
        });
    };
  }

  async sync() {
    if (this.local.readonly) {
      return;
    }
    console.debug('start syncing blob...');
    for (const remote of this.remotes) {
      let localList: string[] = [];
      let remoteList: string[] = [];

      if (!remote.readonly) {
        try {
          localList = await this.local.list();
          remoteList = await remote.list();
        } catch (err) {
          console.error(`error when sync`, err);
          continue;
        }

        const needUpload = difference(localList, remoteList);
        for (const key of needUpload) {
          try {
            const data = await this.local.get(key);
            if (data) {
              await remote.set(key, data);
            }
          } catch (err) {
            logger.error(
              `error when sync ${key} from [${this.local.name}] to [${remote.name}]`,
              err,
            );
          }
        }
      }

      const needDownload = difference(remoteList, localList);

      for (const key of needDownload) {
        try {
          const data = await remote.get(key);
          if (data) {
            await this.local.set(key, data);
          }
        } catch (err) {
          logger.error(
            `error when sync ${key} from [${remote.name}] to [${this.local.name}]`,
            err,
          );
        }
      }
    }

    logger.debug('finish syncing blob');
  }
  stop() {
    this.abort?.abort();
    this.abort = null;
  }
}
