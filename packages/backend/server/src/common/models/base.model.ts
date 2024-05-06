export abstract class BaseModel {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(doc: Partial<BaseModel>) {
    Object.assign(this, doc);
  }
}
