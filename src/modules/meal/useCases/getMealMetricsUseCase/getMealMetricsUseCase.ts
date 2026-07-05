import { Injectable } from '@nestjs/common';
import { MealRepository } from '../../repositories/MealRepository';

interface GetMealMetricsRequest {
  userId: string;
}

interface GetMealMetricsResponse {
  totalMeals: number;
  totalMealsOnDiet: number;
  totalMealsOffDiet: number;
  bestOnDietStreak: number;
}

@Injectable()
export class GetMealMetricsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ userId }: GetMealMetricsRequest): Promise<GetMealMetricsResponse> {
    const meals = await this.mealRepository.findManyByUserId(userId);

    // Ordena as refeições cronologicamente de forma crescente (mais antiga para mais recente)
    const sortedMeals = meals.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    let totalMealsOnDiet = 0;
    let totalMealsOffDiet = 0;
    let bestOnDietStreak = 0;
    let currentStreak = 0;

    for (const meal of sortedMeals) {
      if (meal.isOnDiet) {
        totalMealsOnDiet++;
        currentStreak++;
      } else {
        totalMealsOffDiet++;
        bestOnDietStreak = Math.max(bestOnDietStreak, currentStreak);
        currentStreak = 0;
      }
    }

    // Validação final caso o streak recorde termine no último elemento da lista
    bestOnDietStreak = Math.max(bestOnDietStreak, currentStreak);

    return {
      totalMeals: meals.length,
      totalMealsOnDiet,
      totalMealsOffDiet,
      bestOnDietStreak,
    };
  }
}
