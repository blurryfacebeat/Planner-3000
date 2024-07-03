import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { hash } from '../utils/hash.utils';
import { UserDto } from './dto/user.dto';
import { TaskService } from '../task/task.service';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private taskService: TaskService,
  ) {}

  async getById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const totalTasks = profile.tasks.length;
    const completedTasks = await this.taskService.getCompletedTasksCount(id);

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.taskService.getTasksByDateCount(todayStart.toISOString(), id);
    const weekTasks = await this.taskService.getTasksByDateCount(weekStart.toISOString(), id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restProfile } = profile;

    return {
      user: restProfile,
      statistics: [
        { label: 'Total', value: totalTasks },
        { label: 'Completed tasks', value: completedTasks },
        {
          label: 'Today tasks',
          value: todayTasks,
        },
        { label: 'Week tasks', value: weekTasks },
      ],
    };
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
    };

    return this.prismaService.user.create({
      data: user,
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = user;

    return restUser;
  }

  async getUserIntervalsCount(userId: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        intervalsCount: true,
      },
    });
  }
}
