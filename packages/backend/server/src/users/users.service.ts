import { BadRequestException, Injectable } from '@nestjs/common';

import { PasswordService } from '../auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private passwordService: PasswordService,
    private repository: UserRepository,
  ) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.repository.updateUserData(userId, newUserData);
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.repository.updateUserData(userId, {
      password: hashedPassword,
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    const maybeUser = await this.repository.findUserByUsername(username);

    if (!maybeUser) {
      throw new BadRequestException(
        `No user named: ${username}, please check again`,
      );
    }

    return maybeUser;
  }
}
