import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUserDecorator = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    // Сам запрос
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
