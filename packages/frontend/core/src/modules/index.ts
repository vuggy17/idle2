import { configureInfraModule } from '@idle/infra';
import type { Container } from 'inversify';

import { configureFriendRequestDataSourceImpl } from './requests/impl';
import { configureSocketModule } from './socket';

export function configureCommonModule(container: Container) {
  configureInfraModule(container);
  configureSocketModule(container);
}

export function configureImpl(container: Container) {
  configureFriendRequestDataSourceImpl(container);
}

export { buildDecorators, EventBus } from '@idle/infra';
