import 'reflect-metadata';

import { IsEmail, IsString } from 'class-validator';

import { BaseModel } from '../../common/models/base.model';

export class User extends BaseModel {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  displayName: string;

  password?: string;
}
