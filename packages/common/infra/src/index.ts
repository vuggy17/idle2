import type { Container } from 'inversify';

import { configureFriendRequestModule } from './modules/requests';

export const INFRA = 'infra';
export * from './di/tokens';
export * from './modules/requests';

export function configureInfraModule(container: Container) {
  configureFriendRequestModule(container);
}
