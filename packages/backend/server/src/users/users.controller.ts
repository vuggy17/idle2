import { UserDTO } from '@idle/model';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { v2 } from 'cloudinary';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async me(@AuthUser() user: AuthUser): Promise<UserDTO> {
    return {
      id: user.id,
      avatarUrl: v2.utils.url(`avatars/${user.id}`, {
        width: 100,
        height: 100,
        crop: 'scale',
        quality: 'auto',
        fetch_format: 'auto',
      }),
      email: user.email,
      displayName: user.displayName,
      username: user.username,
    };
  }

  @Post('update')
  async updateUser(
    @AuthUser() user: AuthUser,
    @Body() newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @Patch('change-password')
  async changePassword(
    @AuthUser() user: AuthUser,
    @Body('data') changePassword: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password!,
      changePassword,
    );
  }
}
