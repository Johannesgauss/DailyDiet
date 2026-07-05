import { Meal } from '../entities/Meal';

export abstract class MealRepository {
  abstract create(meal: Meal): Promise<void>;
  abstract findById(id: string): Promise<Meal | null>;
  abstract save(meal: Meal): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByUserId(userId: string): Promise<Meal[]>;
}
