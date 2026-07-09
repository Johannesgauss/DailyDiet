import { CreateMealUseCase } from './createMealUseCase';
import { InMemoryMealRepository } from '../../repositories/in-memory/InMemoryMealRepository';

describe('Caso de Uso de Criação de Refeição', () => {
  let inMemoryMealRepository: InMemoryMealRepository;
  let createMealUseCase: CreateMealUseCase;

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository();
    createMealUseCase = new CreateMealUseCase(inMemoryMealRepository);
  });

  it('deve ser capaz de criar uma nova refeição', async () => {
    const dateTime = new Date();
    const meal = await createMealUseCase.execute({
      name: 'Salada',
      description: 'Uma salada saudável para o almoço',
      dateTime,
      isOnDiet: true,
      userId: 'user-id-1',
    });

    expect(meal).toHaveProperty('id');
    expect(meal.name).toBe('Salada');
    expect(meal.description).toBe('Uma salada saudável para o almoço');
    expect(meal.dateTime).toEqual(dateTime);
    expect(meal.isOnDiet).toBe(true);
    expect(meal.userId).toBe('user-id-1');
    expect(inMemoryMealRepository.items.length).toBe(1);
    expect(inMemoryMealRepository.items[0]).toEqual(meal);
  });

  it('deve criar uma refeição com descrição nula se não for informada', async () => {
    const meal = await createMealUseCase.execute({
      name: 'Hambúrguer',
      dateTime: new Date(),
      isOnDiet: false,
      userId: 'user-id-1',
    });

    expect(meal.description).toBeNull();
  });
});
