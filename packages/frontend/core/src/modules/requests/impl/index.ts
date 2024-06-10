import type { FriendRequestDataSource } from '@idle/infra';
import { DI } from '@idle/infra';
import type { Container } from 'inversify';

import { CloudFriendRequestDataSource } from './cloud-datasource';

export function configureFriendRequestDataSourceImpl(container: Container) {
  container
    .bind<FriendRequestDataSource>(DI.TOKENS.FriendRequestDataSource)
    .to(CloudFriendRequestDataSource)
    .inSingletonScope();
}
