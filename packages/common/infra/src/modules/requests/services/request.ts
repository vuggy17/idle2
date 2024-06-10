import 'reflect-metadata';

import { inject, injectable, named } from 'inversify';
import { Observable } from 'rxjs';

import { DI } from '../../../di/tokens';
import { LiveData } from '../../../livedata';
import { FriendRequestList } from '../entites/requests';
import type { FriendRequestDataSource } from '../providers/datasource';
import type { FriendRequestStore } from '../stores/request';

// presenter
@injectable()
export class FriendRequestService {
  list: FriendRequestList;

  onRequestReceived$: LiveData;

  revalidating$ = new LiveData(true);

  constructor(
    @inject(DI.TOKENS.FriendRequestDataSource)
    private readonly dataSource: FriendRequestDataSource,
    @inject(DI.TOKENS.FriendRequestStore)
    private readonly store: FriendRequestStore,
  ) {
    this.list = new FriendRequestList(store);
    this.onRequestReceived$ = LiveData.from(
      new Observable((subscriber) => {
        const off = this.dataSource.on('added', () => subscriber.next());

        return off;
      }),
      null,
    );

    this.waitForReady();
  }

  async waitForReady() {
    const { abort, signal } = new AbortController();
    await this.dataSource.waitForConnected(signal);
    await this.revalidate();

    return { abort };
  }

  async revalidate() {
    const requests = await this.dataSource.list();
    this.store.setRequests(requests);
    this.revalidating$.next(false);
  }

  sendRequest() {}

  async cancelRequest(id: string) {
    await this.dataSource.withdraw(id);
    this.revalidate();
  }

  async acceptRequest(id: string) {
    await this.dataSource.accept(id);
    this.revalidate();
  }
}
