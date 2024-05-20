import type { AnyModel, ModelClass } from 'mobx-keystone';

export class DocSyncEngine {
  constructor(
    readonly rootDoc: ModelClass<AnyModel>,
    readonly source,
  ) {}
}
