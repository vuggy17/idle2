import { Module } from '@nestjs/common';

import { PasswordService } from '../auth/password.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, PasswordService],
  controllers: [UserController],
})
export class UsersModule {}
