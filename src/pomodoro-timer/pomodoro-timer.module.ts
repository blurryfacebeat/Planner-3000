import { Module } from '@nestjs/common';
import { PomodoroTimerService } from './pomodoro-timer.service';
import { PomodoroTimerController } from './pomodoro-timer.controller';
import { PrismaService } from '../services/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PomodoroTimerController],
  providers: [PomodoroTimerService, PrismaService],
})
export class PomodoroTimerModule {}
