import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { ColorsService } from './colors.service';
import { GetColorsDto } from './dto/get-colors.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

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

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiSecurity('api-key')
  @ApiOperation({ summary: 'Create a new color (requires API key)' })
  @ApiResponse({ status: 201, description: 'Color successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing API key' })
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.createColor(createColorDto);
  }
}