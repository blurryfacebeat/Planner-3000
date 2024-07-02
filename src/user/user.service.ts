import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { hash } from '../utils/hash.utils';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

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
}
