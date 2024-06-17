import { createId, isCuid } from '@paralleldrive/cuid2';

export class ID {
  static unique() {
    return createId();
  }

  constructor(readonly id: string) {
    if (!isCuid(id)) throw new Error('Invalid id, use a cuid instead');
  }
}
