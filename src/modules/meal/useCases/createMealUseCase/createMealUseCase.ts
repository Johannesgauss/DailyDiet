import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';
import { Meal } from '../../entities/Meal';

interface CreateMealRequest {
  name: string;
  description?: string | null;
  dateTime: Date;
  isOnDiet: boolean;
  userId: string;
}

@Injectable()
export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    name,
    description,
    dateTime,
    isOnDiet,
    userId,
  }: CreateMealRequest): Promise<Meal> {
    const meal = new Meal({
      name,
      description,
      dateTime,
      isOnDiet,
      userId,
    });

    await this.mealRepository.create(meal);

    return meal;
  }
}
