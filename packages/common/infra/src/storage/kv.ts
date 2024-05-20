export interface KV<T> extends KVBehavior<T> {
  transaction(cb: (transaction: KVBehavior<T>) => Promise<T>): Promise<T>;
}

export interface KVBehavior<T extends {} = Uint8Array> {
  get(key: string): Promise<T | null> | T | null;
  set(key: string, value: T): Promise<void> | void;
  del(key: string): Promise<void> | void;
  keys(): Promise<string[]> | string[];
  clear(): Promise<void> | void;
}
