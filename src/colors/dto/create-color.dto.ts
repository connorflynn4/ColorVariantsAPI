import { IsString, IsOptional, IsBoolean, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({ description: 'Color name', example: 'Ocean Blue' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Hex color code', example: '#0066CC' })
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'hex must be a valid hex color code (e.g., #0066CC)',
  })
  hex: string;

  @ApiProperty({ description: 'RGB color value', example: 'rgb(0, 102, 204)' })
  @IsString()
  @Matches(/^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/, {
    message: 'rgb must be a valid RGB format (e.g., rgb(0, 102, 204))',
  })
  rgb: string;

  @ApiPropertyOptional({ description: 'Color category', example: 'blue' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Accessibility status', example: true })
  @IsOptional()
  @IsBoolean()
  accessible?: boolean;
}

