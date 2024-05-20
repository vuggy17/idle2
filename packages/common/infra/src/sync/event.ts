type SyncPayload = {
  collectionName: 'request';
  type: 'add' | 'delete' | 'update';
  data: Uint8Array;
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