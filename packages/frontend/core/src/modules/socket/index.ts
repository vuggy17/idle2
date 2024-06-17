import { DI } from '@idle/infra';
import type { Container } from 'inversify';

import { SocketService } from './socket';

export function configureSocketModule(container: Container) {
  container
    .bind<SocketService>(DI.TOKENS.SocketService)
    .to(SocketService)
    .inSingletonScope();
}
