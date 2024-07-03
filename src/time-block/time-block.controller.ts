import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { CheckAuthDecorator } from '../auth/decorators/check-auth.decorator';
import { CurrentUserDecorator } from '../auth/decorators/current-user.decorator';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @CheckAuthDecorator()
  async getAll(@CurrentUserDecorator('id') userId: string) {
    return this.timeBlockService.getAll(userId);
  }

  @Post()
  @HttpCode(200)
  @CheckAuthDecorator()
  async create(@Body() dto: TimeBlockDto, @CurrentUserDecorator('id') userId: string) {
    return this.timeBlockService.create(dto, userId);
  }

  @Patch('update-order')
  @HttpCode(200)
  @CheckAuthDecorator()
  async updateOrder(@Body() dto: UpdateOrderDto) {
    return this.timeBlockService.updateOrder(dto.ids);
  }

  @Patch(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async update(
    @Body() dto: Partial<TimeBlockDto>,
    @CurrentUserDecorator('id') userId: string,
    @Param('id') timeBlockId: string,
  ) {
    return this.timeBlockService.update(dto, timeBlockId, userId);
  }

  @Delete(':id')
  @HttpCode(200)
  @CheckAuthDecorator()
  async delete(@CurrentUserDecorator('id') userId: string, @Param('id') timeBlockId: string) {
    return this.timeBlockService.delete(timeBlockId, userId);
  }
}
