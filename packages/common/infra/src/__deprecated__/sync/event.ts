type SyncPayload = {
  collectionName: 'request';
  type: 'add' | 'delete' | 'update';
  data: unknown;
};

export type SyncEvent =
  | {
      type: 'ClientUpdateCommitted';
      clientId: string;
      docId: string;
      update: SyncPayload;
      seqNum: number;
    }
  | {
      type: 'ServerUpdateCommitted';
      docId: string;
      update: SyncPayload;
      clientId: string;
    };

export interface EventBus {
  emit(event: SyncEvent): void;
  on(cb: (event: SyncEvent) => void): () => void;
}

export class EventBusInner implements EventBus {
  constructor(private readonly eventBusBehavior: EventBus) {}

  emit(event: SyncEvent) {
    this.eventBusBehavior.emit(event);
  }

  on(cb: (event: SyncEvent) => void) {
    return this.eventBusBehavior.on(cb);
  }
}

export class MemoryDocEventBus implements EventBus {
  listeners = new Set<(event: SyncEvent) => void>();

  emit(event: SyncEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (e) {
        console.error(e);
      }
    }
  }

  on(cb: (event: SyncEvent) => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }
}
