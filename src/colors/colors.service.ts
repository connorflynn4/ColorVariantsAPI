import { Injectable } from '@nestjs/common';

@Injectable()
export class ColorsService {
  getColors() {
    return [
      { id: 'blue-500', name: 'Blue 500', hex: '#3B82F6' },
      { id: 'red-500', name: 'Red 500', hex: '#EF4444' },
    ];
  }
}
