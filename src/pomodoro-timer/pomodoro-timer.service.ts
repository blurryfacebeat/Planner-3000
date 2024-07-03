import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../user/user.service';
import { USER_NOT_FOUND_ERROR } from '../auth/messages/auth.messages';
import { PomodoroTimerSessionDto } from './dto/pomodoro-timer-session.dto';
import { PomodoroTimerRoundDto } from './dto/pomodoro-timer-round.dto';

@Injectable()
export class PomodoroTimerService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];

    return this.prismaService.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'desc',
          },
        },
      },
    });
  }

  async create(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) {
      return todaySession;
    }

    const user = await this.userService.getUserIntervalsCount(userId);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    return this.prismaService.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalsCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        rounds: true,
      },
    });
  }

  async update(dto: Partial<PomodoroTimerSessionDto>, pomodoroId: string, userId: string) {
    return this.prismaService.pomodoroSession.update({
      where: {
        userId,
        id: pomodoroId,
      },
      data: dto,
    });
  }

  async updateRound(dto: Partial<PomodoroTimerRoundDto>, roundId: string, userId: string) {
    return this.prismaService.pomodoroSession.update({
      where: {
        userId,
        id: roundId,
      },
      data: dto,
    });
  }

  async deleteSession(sessionId: string, userId: string) {
    return this.prismaService.pomodoroSession.delete({
      where: {
        userId,
        id: sessionId,
      },
    });
  }
}
