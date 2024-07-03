import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PomodoroTimerService } from './pomodoro-timer.service';
import { CheckAuthDecorator } from '../auth/decorators/check-auth.decorator';
import { CurrentUserDecorator } from '../auth/decorators/current-user.decorator';
import { PomodoroTimerRoundDto } from './dto/pomodoro-timer-round.dto';

@Controller('user/pomodoro-timer')
export class PomodoroTimerController {
  constructor(private readonly pomodoroTimerService: PomodoroTimerService) {}

  @Get('today')
  @CheckAuthDecorator()
  async getTodaySession(@CurrentUserDecorator('id') userId: string) {
    return this.pomodoroTimerService.getTodaySession(userId);
  }

  @Post()
  @HttpCode(200)
  @CheckAuthDecorator()
  async create(@CurrentUserDecorator('id') userId: string) {
    return this.pomodoroTimerService.create(userId);
  }

  @Patch('/round/:id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async updateRound(@Param('id') id: string, @Body() dto: PomodoroTimerRoundDto) {
    return this.pomodoroTimerService.updateRound(dto, id);
  }

  @Patch(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async update(
    @Param('id') id: string,
    @CurrentUserDecorator('id') userId: string,
    @Body() dto: PomodoroTimerRoundDto,
  ) {
    return this.pomodoroTimerService.update(dto, id, userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async deleteSession(@Param('id') id: string, @CurrentUserDecorator('id') userId: string) {
    return this.pomodoroTimerService.deleteSession(id, userId);
  }
}
