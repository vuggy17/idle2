import 'reflect-metadata';

import { BaseModel } from '../../common/models/base.model';

export class User extends BaseModel {
  email: string;

  username: string;

  displayName: string;

  password: string | null;

  constructor(doc: User) {
    super(doc);
    Object.assign(this, doc);
  }
}
