import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ColorsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.color.findMany();
  }

  async findById(id: string) {
    return this.prisma.color.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    hex: string;
    rgb: string;
    category?: string;
    accessible?: boolean;
  }) {
    return this.prisma.color.create({ data });
  }

  async update(id: string, data: Partial<{
    name: string;
    hex: string;
    rgb: string;
    category?: string;
    accessible?: boolean;
  }>) {
    return this.prisma.color.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.color.delete({
      where: { id },
    });
  }
}
