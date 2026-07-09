import { EditMealUseCase } from './editMealUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';
import { Meal } from '../../entities/Meal';
import { MealNotFoundException } from '../../exceptions/MealNotFoundException';
import { MealWithoutPermissionException } from '../../exceptions/MealWithoutPermissionException';

describe('Caso de Uso de Edição de Refeição', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let editMealUseCase: EditMealUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    editMealUseCase = new EditMealUseCase(inMemoryMealRepository);
  });

  it('deve ser capaz de editar uma refeição', async () => {
    const meal = new Meal({
      name: 'Salada',
      description: 'Sem molho',
      dateTime: new Date('2026-07-09T12:00:00Z'),
      isOnDiet: true,
      userId: 'user-1',
    });

    await inMemoryMealRepository.create(meal);

    const updatedDateTime = new Date('2026-07-09T13:00:00Z');
    const updatedMeal = await editMealUseCase.execute({
      mealId: meal.id,
      userId: 'user-1',
      name: 'Salada com Abacate',
      description: 'Com óleo de abacate',
      dateTime: updatedDateTime,
      isOnDiet: true,
    });

    expect(updatedMeal.id).toBe(meal.id);
    expect(updatedMeal.name).toBe('Salada com Abacate');
    expect(updatedMeal.description).toBe('Com óleo de abacate');
    expect(updatedMeal.dateTime).toEqual(updatedDateTime);
    expect(updatedMeal.isOnDiet).toBe(true);

    const mealInRepo = await inMemoryMealRepository.findById(meal.id);
    expect(mealInRepo?.name).toBe('Salada com Abacate');
  });

  it('não deve ser capaz de editar uma refeição inexistente', async () => {
    await expect(
      editMealUseCase.execute({
        mealId: 'non-existing-meal-id',
        userId: 'user-1',
        name: 'Nome Atualizado',
        dateTime: new Date(),
        isOnDiet: false,
      }),
    ).rejects.toThrow(MealNotFoundException);
  });

  it('não deve ser capaz de editar uma refeição de outro usuário', async () => {
    const meal = new Meal({
      name: 'Pizza',
      dateTime: new Date(),
      isOnDiet: false,
      userId: 'user-2',
    });

    await inMemoryMealRepository.create(meal);

    await expect(
      editMealUseCase.execute({
        mealId: meal.id,
        userId: 'user-1',
        name: 'Nome Atualizado',
        dateTime: new Date(),
        isOnDiet: true,
      }),
    ).rejects.toThrow(MealWithoutPermissionException);
  });
});
