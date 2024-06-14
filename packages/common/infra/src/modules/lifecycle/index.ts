import type { Container } from 'inversify';

import { DI } from '../../di/tokens';
import { LifecycleService } from './service';

export {
  ApplicationFocused,
  ApplicationStarted,
  LifecycleService,
} from './service';
export function configureLifeCycleModule(container: Container) {
  container
    .bind<LifecycleService>(DI.TOKENS.LifecycleService)
    .to(LifecycleService);
}
