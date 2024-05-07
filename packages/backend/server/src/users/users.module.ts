import { Module } from '@nestjs/common';

import { PasswordService } from '../auth/password.service';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, PasswordService, UserRepository],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
