import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { TaskDto } from './dto/task.dto';

type DateWhereType = 'lte' | 'gte' | 'lt' | 'gt';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: TaskDto, userId: string) {
    return this.prismaService.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async delete(taskId: string, userId: string) {
    return this.prismaService.task.delete({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
    return this.prismaService.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }

  async getAll(userId: string) {
    return this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

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
