import type { Container } from 'inversify';

import { EventBus } from './di/event';
import { DI } from './di/tokens';
import { configureLifeCycleModule } from './modules/lifecycle';
import { configureFriendRequestModule } from './modules/requests';

export * from './di/core';
export * from './di/event';
export * from './di/tokens';
export * from './modules/lifecycle';
export * from './modules/requests';

export function configureInfraModule(container: Container) {
  container
    .bind(DI.TOKENS.Container)
    .toDynamicValue((ctx) => ctx.container as Container);
  container.bind<EventBus>(DI.TOKENS.EventBus).to(EventBus);

  configureFriendRequestModule(container);
  configureLifeCycleModule(container);
}
