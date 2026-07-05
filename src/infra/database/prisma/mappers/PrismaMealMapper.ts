import { Meal } from 'src/modules/meal/entities/Meal';
import { Meal as MealRaw } from '@prisma/client';

export class PrismaMealMapper {
  static toPrisma({ id, name, description, dateTime, isOnDiet, userId }: Meal): MealRaw {
    return {
      id,
      name,
      description,
      dateTime,
      isOnDiet,
      userId,
    };
  }

  static toDomain({ id, name, description, dateTime, isOnDiet, userId }: MealRaw): Meal {
    return new Meal(
      {
        name,
        description,
        dateTime,
        isOnDiet,
        userId,
      },
      id,
    );
  }
}
