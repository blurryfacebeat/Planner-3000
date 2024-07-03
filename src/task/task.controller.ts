import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CheckAuthDecorator } from '../auth/decorators/check-auth.decorator';
import { CurrentUserDecorator } from '../auth/decorators/current-user.decorator';
import { TaskDto } from './dto/task.dto';

@Controller('user/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @CheckAuthDecorator()
  async getAll(@CurrentUserDecorator('id') userId: string) {
    return this.taskService.getAll(userId);
  }

  @Post()
  @CheckAuthDecorator()
  @HttpCode(200)
  async create(@Body() dto: TaskDto, @CurrentUserDecorator('id') userId: string) {
    return this.taskService.create(dto, userId);
  }

  @Patch(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async update(
    @Body() dto: Partial<TaskDto>,
    @CurrentUserDecorator('id') userId: string,
    @Param('id') taskId: string,
  ) {
    return this.taskService.update(dto, taskId, userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async delete(@CurrentUserDecorator('id') userId: string, @Param('id') taskId: string) {
    return this.taskService.delete(taskId, userId);
  }
}
