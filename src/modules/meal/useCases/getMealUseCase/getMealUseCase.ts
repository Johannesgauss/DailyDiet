import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';
import { Meal } from '../../entities/Meal';

interface GetMealRequest {
  mealId: string;
  userId: string;
}

@Injectable()
export class GetMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId, userId }: GetMealRequest): Promise<Meal> {
    const meal = await this.mealRepository.findById(mealId);

    if (!meal) {
      throw new MealNotFoundException();
    }

    if (meal.userId !== userId) {
      throw new MealWithoutPermissionException({ actionName: 'visualizar' });
    }

    return meal;
  }
}
