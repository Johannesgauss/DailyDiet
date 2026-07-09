import { DeleteMealUseCase } from './deleteMealUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';
import { Meal } from '../../entities/Meal';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';

describe('Caso de Uso de Exclusão de Refeição', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let deleteMealUseCase: DeleteMealUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    deleteMealUseCase = new DeleteMealUseCase(inMemoryMealRepository);
  });

  it('deve ser capaz de deletar uma refeição', async () => {
    const meal = new Meal({
      name: 'Arroz e Feijão',
      dateTime: new Date(),
      isOnDiet: true,
      userId: 'user-1',
    });

    await inMemoryMealRepository.create(meal);
    expect(inMemoryMealRepository.items.length).toBe(1);

    await deleteMealUseCase.execute({
      mealId: meal.id,
      userId: 'user-1',
    });

    expect(inMemoryMealRepository.items.length).toBe(0);
  });

  it('não deve ser capaz de deletar uma refeição inexistente', async () => {
    await expect(
      deleteMealUseCase.execute({
        mealId: 'non-existing-meal-id',
        userId: 'user-1',
      }),
    ).rejects.toThrow(MealNotFoundException);
  });

  it('não deve ser capaz de deletar uma refeição de outro usuário', async () => {
    const meal = new Meal({
      name: 'Pizza',
      dateTime: new Date(),
      isOnDiet: false,
      userId: 'user-2',
    });

    await inMemoryMealRepository.create(meal);

    await expect(
      deleteMealUseCase.execute({
        mealId: meal.id,
        userId: 'user-1',
      }),
    ).rejects.toThrow(MealWithoutPermissionException);

    expect(inMemoryMealRepository.items.length).toBe(1);
  });
});
