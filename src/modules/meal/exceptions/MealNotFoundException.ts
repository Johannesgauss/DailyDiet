import { NotFoundException } from '@nestjs/common';

export class MealNotFoundException extends NotFoundException {
  constructor() {
    super('Refeição não encontrada.');
  }
}
