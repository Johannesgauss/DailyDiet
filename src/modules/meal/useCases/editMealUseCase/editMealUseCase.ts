import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';
import { Meal } from '../../entities/Meal';

interface EditMealRequest {
  mealId: string;
  userId: string;
  name: string;
  description?: string | null;
  dateTime: Date;
  isOnDiet: boolean;
}

@Injectable()
export class EditMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId,
    name,
    description,
    dateTime,
    isOnDiet,
  }: EditMealRequest): Promise<Meal> {
    const meal = await this.mealRepository.findById(mealId);

    if (!meal) {
      throw new MealNotFoundException();
    }

    if (meal.userId !== userId) {
      throw new MealWithoutPermissionException({ actionName: 'editar' });
    }

    meal.name = name;
    meal.description = description ?? null;
    meal.dateTime = dateTime;
    meal.isOnDiet = isOnDiet;

    await this.mealRepository.save(meal);

    return meal;
  }
}
