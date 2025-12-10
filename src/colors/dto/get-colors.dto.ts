import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetColorsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  accessible?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}
