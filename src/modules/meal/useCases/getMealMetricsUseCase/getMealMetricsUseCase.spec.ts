import { GetMealMetricsUseCase } from './getMealMetricsUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';
import { Meal } from '../../entities/Meal';

describe('Caso de Uso de Obter Métricas de Refeição', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let getMealMetricsUseCase: GetMealMetricsUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    getMealMetricsUseCase = new GetMealMetricsUseCase(inMemoryMealRepository);
  });

  it('deve retornar todas as métricas como 0 se o usuário não tiver refeições', async () => {
    const metrics = await getMealMetricsUseCase.execute({
      userId: 'user-1',
    });

    expect(metrics).toEqual({
      totalMeals: 0,
      totalMealsOnDiet: 0,
      totalMealsOffDiet: 0,
      bestOnDietStreak: 0,
    });
  });

  it('deve calcular corretamente as métricas para uma mistura de refeições dentro e fora da dieta', async () => {
    const meals = [
      new Meal({
        name: 'Refeição 1',
        dateTime: new Date('2026-07-09T08:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 2',
        dateTime: new Date('2026-07-09T12:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 3',
        dateTime: new Date('2026-07-09T16:00:00Z'),
        isOnDiet: false,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 4',
        dateTime: new Date('2026-07-09T20:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 5',
        dateTime: new Date('2026-07-10T08:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 6',
        dateTime: new Date('2026-07-10T12:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 7',
        dateTime: new Date('2026-07-10T16:00:00Z'),
        isOnDiet: false,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 8',
        dateTime: new Date('2026-07-10T20:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição de outro usuário',
        dateTime: new Date('2026-07-10T21:00:00Z'),
        isOnDiet: true,
        userId: 'user-2',
      }),
    ];

    for (const meal of meals) {
      await inMemoryMealRepository.create(meal);
    }

    const metrics = await getMealMetricsUseCase.execute({
      userId: 'user-1',
    });

    expect(metrics).toEqual({
      totalMeals: 8,
      totalMealsOnDiet: 6,
      totalMealsOffDiet: 2,
      bestOnDietStreak: 3,
    });
  });

  it('deve ordenar corretamente as refeições de forma cronológica antes de calcular a sequência', async () => {
    const meals = [
      new Meal({
        name: 'Refeição 3',
        dateTime: new Date('2026-07-09T20:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 1',
        dateTime: new Date('2026-07-09T08:00:00Z'),
        isOnDiet: true,
        userId: 'user-1',
      }),
      new Meal({
        name: 'Refeição 2',
        dateTime: new Date('2026-07-09T14:00:00Z'),
        isOnDiet: false,
        userId: 'user-1',
      }),
    ];

    for (const meal of meals) {
      await inMemoryMealRepository.create(meal);
    }

    const metrics = await getMealMetricsUseCase.execute({
      userId: 'user-1',
    });

    expect(metrics.bestOnDietStreak).toBe(1);
    expect(metrics.totalMeals).toBe(3);
    expect(metrics.totalMealsOnDiet).toBe(2);
    expect(metrics.totalMealsOffDiet).toBe(1);
  });
});
