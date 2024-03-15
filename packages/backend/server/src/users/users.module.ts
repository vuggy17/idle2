import { Module } from '@nestjs/common';

import { PasswordService } from '../auth/password.service';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
