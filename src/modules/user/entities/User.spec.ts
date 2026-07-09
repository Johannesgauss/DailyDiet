import { User } from './User';

describe('Entidade de Usuário', () => {
  it('deve ser capaz de criar um usuário', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('password123');
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('deve ser capaz de atualizar os dados do usuário usando setters', () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    user.name = 'Jane Doe';
    user.email = 'jane@example.com';
    user.password = 'newpassword123';

    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
    expect(user.password).toBe('newpassword123');
  });
});
