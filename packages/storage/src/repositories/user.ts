import { databaseService } from '../database';
import { PrismaClient, User } from '../prisma/generated/client';

export class UserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = databaseService.getClient();
  }

  async create(data: { email: string; name?: string }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Partial<{ email: string; name?: string }>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
