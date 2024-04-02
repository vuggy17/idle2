import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  updateUserData(
    userId: string,
    newUserData: {
      firstname?: string;
      lastname?: string;
      password?: string;
    },
  ) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }
}
