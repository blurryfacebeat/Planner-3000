import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';

export const CheckAuthDecorator = () => UseGuards(JwtAuthGuard);
