import { configureInfraModule } from '@idle/infra';
import type { Container } from 'inversify';

import { configureFriendRequestDataSourceImpl } from './requests/impl';

export function configureCommonModule(container: Container) {
  configureInfraModule(container);
}

export function configureImpl(container: Container) {
  configureFriendRequestDataSourceImpl(container);
}
