import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';
import { Meal } from '../../entities/Meal';

interface GetManyMealsRequest {
  userId: string;
}

@Injectable()
export class GetManyMealsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ userId }: GetManyMealsRequest): Promise<Meal[]> {
    return await this.mealRepository.findManyByUserId(userId);
  }
}
