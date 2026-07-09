import { Meal } from './Meal';

describe('Entidade de Refeição', () => {
  it('deve ser capaz de criar uma refeição', () => {
    const dateTime = new Date();
    const meal = new Meal({
      name: 'Almoço',
      description: 'Arroz e feijão',
      dateTime,
      isOnDiet: true,
      userId: 'user-1',
    });

    expect(meal.id).toBeDefined();
    expect(meal.name).toBe('Almoço');
    expect(meal.description).toBe('Arroz e feijão');
    expect(meal.dateTime).toEqual(dateTime);
    expect(meal.isOnDiet).toBe(true);
    expect(meal.userId).toBe('user-1');
  });

  it('deve ser capaz de atualizar os dados da refeição usando setters', () => {
    const meal = new Meal({
      name: 'Almoço',
      description: 'Arroz e feijão',
      dateTime: new Date(),
      isOnDiet: true,
      userId: 'user-1',
    });

    const newDateTime = new Date();
    meal.name = 'Jantar';
    meal.description = 'Salada';
    meal.dateTime = newDateTime;
    meal.isOnDiet = false;

    expect(meal.name).toBe('Jantar');
    expect(meal.description).toBe('Salada');
    expect(meal.dateTime).toEqual(newDateTime);
    expect(meal.isOnDiet).toBe(false);
  });
});
