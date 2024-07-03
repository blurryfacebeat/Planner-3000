import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

type DateWhereType = 'lte' | 'gte' | 'lt' | 'gt';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async getCompletedTasksCount(userId: string) {
    return this.prismaService.task.count({
      where: {
        userId,
        isCompleted: true,
      },
    });
  }

  async getTasksByDateCount(date: string, userId: string, type: DateWhereType = 'gte') {
    return this.prismaService.task.count({
      where: {
        userId,
        createdAt: {
          [type]: date,
        },
      },
    });
  }
}
