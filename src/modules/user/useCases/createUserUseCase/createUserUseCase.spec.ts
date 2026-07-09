import { CreateUserUseCase } from './createUserUseCase';
import { InMemoryUserRepository } from '../../repositories/in-memory/InMemoryUserRepository';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';
import { compare } from 'bcrypt';

describe('Caso de Uso de Criação de Usuário', () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('deve ser capaz de criar um novo usuário', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
    expect(inMemoryUserRepository.items.length).toBe(1);
    expect(inMemoryUserRepository.items[0]).toEqual(user);
  });

  it('deve criptografar a senha do usuário após a criação', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(user.password).not.toBe('password123');
    const isPasswordMatched = await compare('password123', user.password);
    expect(isPasswordMatched).toBe(true);
  });

  it('não deve ser capaz de criar um usuário com um e-mail já cadastrado', async () => {
    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        password: 'password456',
      }),
    ).rejects.toThrow(UserWithSameEmailException);
  });
});
