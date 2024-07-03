import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CheckAuthDecorator } from '../auth/decorators/check-auth.decorator';
import { CurrentUserDecorator } from '../auth/decorators/current-user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @CheckAuthDecorator()
  async getProfile(@CurrentUserDecorator('id') id: string) {
    return this.userService.getProfile(id);
  }

  @Patch('profile')
  @HttpCode(200)
  @CheckAuthDecorator()
  async updateProfile(@CurrentUserDecorator('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }
}
