import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @Get('me')
  async me(@AuthUser() user: User): Promise<User> {
    // TODO: handle case: user deleted from appwrite, but app still able to find them cus they got an active token
    return user;
  }

  @Post('update')
  async updateUser(
    @AuthUser() user: User,
    @Body('data') newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @Patch('change-password')
  async changePassword(
    @AuthUser() user: User,
    @Body('data') changePassword: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword,
    );
  }
}
