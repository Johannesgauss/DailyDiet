import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';

interface DeleteMealRequest {
  mealId: string;
  userId: string;
}

@Injectable()
export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId, userId }: DeleteMealRequest): Promise<void> {
    const meal = await this.mealRepository.findById(mealId);

    if (!meal) {
      throw new MealNotFoundException();
    }

    if (meal.userId !== userId) {
      throw new MealWithoutPermissionException({ actionName: 'deletar' });
    }

    await this.mealRepository.delete(mealId);
  }
}
