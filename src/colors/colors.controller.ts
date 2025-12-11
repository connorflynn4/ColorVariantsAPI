import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ColorsService } from './colors.service';
import { GetColorsDto } from './dto/get-colors.dto';

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all colors with optional filtering' })
  @ApiResponse({ status: 200, description: 'Returns filtered list of colors' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'accessible', required: false, description: 'Filter by accessibility', type: Boolean })
  @ApiQuery({ name: 'search', required: false, description: 'Search by color name' })
  getColors(@Query() query: GetColorsDto) {
    return this.colorsService.getColors(query);
  }
}