import 'reflect-metadata';

import { IsEmail } from 'class-validator';

import { BaseModel } from '../../common/models/base.model';

export class User extends BaseModel {
  @IsEmail()
  email: string;

  name?: string;

  avatar?: string;

  password: string;
}
