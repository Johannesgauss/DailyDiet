import { Meal } from '../../entities/Meal';
import { MealRepository } from '../MealRepository';

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = [];

  async create(meal: Meal): Promise<void> {
    this.items.push(meal);
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id === id);

    if (!meal) {
      return null;
    }

    return meal;
  }

  async save(meal: Meal): Promise<void> {
    const index = this.items.findIndex((item) => item.id === meal.id);

    if (index >= 0) {
      this.items[index] = meal;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    return this.items.filter((item) => item.userId === userId);
  }
}
