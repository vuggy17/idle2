import type { Container } from 'inversify';

import { DI } from '../../di/tokens';
import { FriendRequestService } from './services/request';
import { FriendRequestStore } from './stores/request';

export { type FriendRequest } from './entites/requests';
export { type FriendRequestDataSource } from './providers/datasource';
export { FriendRequestService } from './services/request';

export function configureFriendRequestModule(container: Container) {
  container
    .bind<FriendRequestStore>(DI.TOKENS.FriendRequestStore)
    .to(FriendRequestStore)
    .inSingletonScope();
  container
    .bind<FriendRequestService>(FriendRequestService)
    .toSelf()
    .inSingletonScope();
}
