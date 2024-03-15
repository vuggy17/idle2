import 'reflect-metadata';

import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';

import { BaseModel } from '../../common/models/base.model';

export class User extends BaseModel {
  @IsEmail()
  email: string;

  firstname?: string;

  lastname?: string;

  role: Role;

  password: string;
}
