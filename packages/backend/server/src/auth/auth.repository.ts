import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { User } from '../users/models/user.model';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    id?: string;
    email: string;
    password?: string;
    displayName: string;
    username: string;
  }) {
    try {
      const doc = await this.prisma.user.create({
        data: {
          id: data.id,
          email: data.email,
          password: data.password,
          displayName: data.displayName,
          username: data.username,
        },
      });

      return doc;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${data.email} already used.`);
      }

      throw new Error(e);
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.prisma.user.findFirst({ where: { id } });
    return doc ? new User(doc) : null;
  }
}
