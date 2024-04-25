import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  updateUserData(
    userId: string,
    data: {
      name?: string;
      avatarUrl?: string;
      email?: string;
      password?: string;
    },
  ) {
    return this.prisma.user.update({
      data: {
        name: data.name,
        email: data.email,
        avatar: data.avatarUrl,
        password: data.password,
      },
      where: {
        id: userId,
      },
    });
  }
}
