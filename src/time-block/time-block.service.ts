import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { TimeBlockDto } from './dto/time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private prismaService: PrismaService) {}

  async getAll(userId: string) {
    return this.prismaService.timeBlock.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async create(dto: TimeBlockDto, userId: string) {
    return this.prismaService.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string) {
    return this.prismaService.timeBlock.update({
      where: {
        userId,
        id: timeBlockId,
      },
      data: dto,
    });
  }

  async delete(timeBlockId: string, userId: string) {
    return this.prismaService.timeBlock.delete({
      where: {
        userId,
        id: timeBlockId,
      },
    });
  }

  async updateOrder(ids: string[]) {
    return this.prismaService.$transaction(
      ids.map((id, idx) =>
        this.prismaService.timeBlock.update({
          where: { id },
          data: { order: idx },
        }),
      ),
    );
  }
}
