import { injectable } from 'inversify';

import { createEvent, EventEmitter } from '../../../di/event';

/**
 * Event that is emitted when application is started.
 */
export const ApplicationStarted = createEvent<boolean>('ApplicationStarted');

/**
 * Event that is emitted when browser tab or windows is focused again, after being blurred.
 * Can be used to actively refresh some data.
 */
export const ApplicationFocused = createEvent<boolean>('ApplicationFocused');

@injectable()
export class LifecycleService extends EventEmitter {
  applicationStart() {
    this.eventBus.emit(ApplicationStarted, true);
  }

  applicationFocus() {
    this.eventBus.emit(ApplicationFocused, true);
  }
}
