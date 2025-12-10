import { Controller, Get, Query } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { GetColorsDto } from './dto/get-colors.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  getColors(@Query() query: GetColorsDto) {
    return this.colorsService.getColors(query);
  }
}