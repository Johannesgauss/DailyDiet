import { Injectable } from '@nestjs/common';
import { Meal } from 'src/modules/meal/entities/Meal';
import { MealRepository } from 'src/modules/meal/repositories/MealRepository';
import { PrismaService } from '../prisma.service';
import { PrismaMealMapper } from '../mappers/PrismaMealMapper';

@Injectable()
export class PrismaMealRepository implements MealRepository {
  constructor(private prisma: PrismaService) {}

  async create(meal: Meal): Promise<void> {
    const raw = PrismaMealMapper.toPrisma(meal);

    await this.prisma.meal.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Meal | null> {
    const rawMeal = await this.prisma.meal.findUnique({
      where: {
        id,
      },
    });

    if (!rawMeal) {
      return null;
    }

    return PrismaMealMapper.toDomain(rawMeal);
  }

  async save(meal: Meal): Promise<void> {
    const raw = PrismaMealMapper.toPrisma(meal);

    await this.prisma.meal.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.meal.delete({
      where: {
        id,
      },
    });
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    const rawMeals = await this.prisma.meal.findMany({
      where: {
        userId,
      },
    });

    return rawMeals.map(PrismaMealMapper.toDomain);
  }
}
