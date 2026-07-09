import { GetManyMealsUseCase } from './getManyMealsUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';
import { Meal } from '../../entities/Meal';

describe('Caso de Uso de Obter Muitas Refeições', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let getManyMealsUseCase: GetManyMealsUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    getManyMealsUseCase = new GetManyMealsUseCase(inMemoryMealRepository);
  });

  it('deve ser capaz de obter todas as refeições de um usuário', async () => {
    const meal1 = new Meal({
      name: 'Café da manhã',
      dateTime: new Date(),
      isOnDiet: true,
      userId: 'user-1',
    });

    const meal2 = new Meal({
      name: 'Almoço',
      dateTime: new Date(),
      isOnDiet: true,
      userId: 'user-1',
    });

    const mealFromOtherUser = new Meal({
      name: 'Jantar',
      dateTime: new Date(),
      isOnDiet: false,
      userId: 'user-2',
    });

    await inMemoryMealRepository.create(meal1);
    await inMemoryMealRepository.create(meal2);
    await inMemoryMealRepository.create(mealFromOtherUser);

    const meals = await getManyMealsUseCase.execute({
      userId: 'user-1',
    });

    expect(meals.length).toBe(2);
    expect(meals).toEqual(expect.arrayContaining([meal1, meal2]));
    expect(meals).not.toContainEqual(mealFromOtherUser);
  });

  it('deve retornar uma lista vazia se o usuário não tiver refeições', async () => {
    const meals = await getManyMealsUseCase.execute({
      userId: 'user-1',
    });

    expect(meals).toEqual([]);
  });
});
