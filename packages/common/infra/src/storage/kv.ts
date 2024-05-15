export interface ByteKV extends ByteKVBehavior {
  transaction<T>(cb: (transaction: ByteKVBehavior) => Promise<T>): Promise<T>;
}

export interface ByteKVBehavior {
  get(key: string): Promise<Uint8Array | null> | Uint8Array | null;
  set(key: string, value: Uint8Array): Promise<void> | void;
  del(key: string): Promise<void> | void;
  keys(): Promise<string[]> | string[];
  clear(): Promise<void> | void;
}
