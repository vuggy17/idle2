import { Container, inject, injectable } from 'inversify';
import stableHash from 'stable-hash';

import { DebugLogger } from '../debug';
import { METADATA_KEY } from './constant';
import { createIdentifier, parseIdentifier } from './identifier';
import { DI } from './tokens';
import type { SubComponent } from './types';

const logger = new DebugLogger('idle:event-bus');

export interface FrameworkEvent<T> {
  id: string;
  _type: T;
}
export function createEvent<T>(id: string): FrameworkEvent<T> {
  return { id, _type: {} as T };
}

const EventHandlerIdentifier = createIdentifier<EventHandler>('EventHandler');

export type FrameworkEventType<T> =
  T extends FrameworkEvent<infer E> ? E : never;

@injectable()
export class EventObserver {
  readonly __isObserver = true;
}

@injectable()
export class EventEmitter {
  @inject(DI.TOKENS.EventBus)
  protected readonly eventBus!: EventBus;
}

interface EventHandler {
  event: FrameworkEvent<any>;
  handler: (payload: any) => void;
}

@injectable()
export class EventBus {
  private listeners: Record<string, Array<(payload: any) => void>> = {};

  constructor(
    @inject(DI.TOKENS.Container)
    private readonly container: Container,
  ) {
    const handlers = this.container.getAll<EventHandler>(
      parseIdentifier(EventHandlerIdentifier),
    );
    for (const handler of handlers.values()) {
      this.on(handler.event.id, handler.handler);
    }
  }

  on<T>(id: string, listener: (event: FrameworkEvent<T>) => void) {
    if (!this.listeners[id]) {
      this.listeners[id] = [];
    }
    this.listeners[id].push(listener);
    return () => {
      this.off(id, listener);
    };
  }

  off<T>(id: string, listener: (event: FrameworkEvent<T>) => void) {
    if (!this.listeners[id]) {
      return;
    }
    this.listeners[id] = this.listeners[id].filter((l) => l !== listener);
  }

  emit<T>(event: FrameworkEvent<T>, payload: T) {
    logger.debug('Emitting event', event.id, payload);
    const listeners = this.listeners[event.id];
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export const OnEvent = <
  E extends FrameworkEvent<any>,
  C extends abstract new (...args: any) => any,
  I = InstanceType<C>,
>(
  e: E,
  pick: I extends EventObserver
    ? (i: I) => (e: FrameworkEventType<E>) => void
    : never,
) => {
  return (target: C): C => {
    const previousComponent: SubComponent[] =
      Reflect.getMetadata(METADATA_KEY.subComponent, Reflect) || [];

    const newComponents: SubComponent[] = [
      ...previousComponent,
      {
        identifier: EventHandlerIdentifier(
          target.name + stableHash(e) + stableHash(pick),
        ),
        factory: (context) => {
          const { container } = context;
          return {
            event: e,
            handler: (payload) => {
              const i = container.get(target);
              pick(i).apply(i, [payload]);
            },
          } satisfies EventHandler;
        },
      } satisfies SubComponent,
    ];
    Reflect.defineMetadata(METADATA_KEY.subComponent, newComponents, Reflect);
    return target;
  };
};
