import { Injectable } from '@nestjs/common';
import { ColorsRepository } from './repository/colors.repository';
import { GetColorsDto } from './dto/get-colors.dto';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorsService {
  constructor(private repo: ColorsRepository) {}

  async getColors(query: GetColorsDto) {
    const colors = await this.repo.findAll();

    let results = [...colors];

    if (query.category) {
      results = results.filter(c => c.category === query.category);
    }

    if (query.accessible !== undefined) {
      results = results.filter(c => c.accessible === query.accessible);
    }

    if (query.search) {
      const searchValue = query.search.toLowerCase();
      results = results.filter(c =>
        c.name.toLowerCase().includes(searchValue),
      );
    }

    return results;
  }

  async createColor(data: CreateColorDto) {
    return this.repo.create(data);
  }
}
