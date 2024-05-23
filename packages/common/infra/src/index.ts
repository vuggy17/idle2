import { RequestEngine } from './sync/request/engine';
import { MemoryFriendRequestStorage } from './sync/request/storage';
import { ID } from './utils/id';

export const INFRA = 'infra';

const storage = new MemoryFriendRequestStorage();
const engine = new RequestEngine(storage);
engine.addRequest(ID.unique(), ID.unique());
engine.start();
await engine.waitForSynced();

console.log('le', storage.docDb.keys());
