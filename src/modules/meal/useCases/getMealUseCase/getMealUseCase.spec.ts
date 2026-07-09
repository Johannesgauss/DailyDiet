import { GetMealUseCase } from './getMealUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';
import { Meal } from '../../entities/Meal';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';

describe('Caso de Uso de Obter Refeição', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let getMealUseCase: GetMealUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    getMealUseCase = new GetMealUseCase(inMemoryMealRepository);
  });

  it('deve ser capaz de obter uma refeição pelo ID', async () => {
    const meal = new Meal({
      name: 'Almoço',
      description: 'Almoço saudável',
      dateTime: new Date(),
      isOnDiet: true,
      userId: 'user-1',
    });

    await inMemoryMealRepository.create(meal);

    const result = await getMealUseCase.execute({
      mealId: meal.id,
      userId: 'user-1',
    });

    expect(result).toEqual(meal);
  });

  it('não deve ser capaz de obter uma refeição inexistente', async () => {
    await expect(
      getMealUseCase.execute({
        mealId: 'non-existing-meal-id',
        userId: 'user-1',
      }),
    ).rejects.toThrow(MealNotFoundException);
  });

  it('não deve ser capaz de obter uma refeição de outro usuário', async () => {
    const meal = new Meal({
      name: 'Pizza',
      dateTime: new Date(),
      isOnDiet: false,
      userId: 'user-2',
    });

    await inMemoryMealRepository.create(meal);

    await expect(
      getMealUseCase.execute({
        mealId: meal.id,
        userId: 'user-1',
      }),
    ).rejects.toThrow(MealWithoutPermissionException);
  });
});
