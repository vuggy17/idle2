import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { User } from './models/user.model';

@Injectable()
export class UserRepository {
  logger = new Logger(UserRepository.name);

  constructor(private prisma: PrismaService) {}

  updateUserData(
    userId: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
    },
  ) {
    return this.prisma.user.update({
      data: {
        displayName: data.name,
        email: data.email,
        password: data.password,
      },
      where: {
        id: userId,
      },
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const doc = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    return doc ? new User(doc) : null;
  }
}
