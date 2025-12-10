import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { ColorsRepository } from './repository/colors.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, ColorsRepository, PrismaService],
})
export class ColorsModule {}

