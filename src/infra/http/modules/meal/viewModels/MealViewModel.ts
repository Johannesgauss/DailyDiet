import { Meal } from 'src/modules/meal/entities/Meal';

export class MealViewModel {
  static toHttp(meal: Meal) {
    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      dateTime: meal.dateTime,
      isOnDiet: meal.isOnDiet,
    };
  }
}
