import { ValidateUserUseCase } from './validateUserUseCase';
import { InMemoryUserRepository } from '../../../user/repositories/in-memory/InMemoryUserRepository';
import { User } from '../../../user/entities/User';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';
import { hash } from 'bcrypt';

describe('Caso de Uso de Validar Usuário', () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let validateUserUseCase: ValidateUserUseCase;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    validateUserUseCase = new ValidateUserUseCase(inMemoryUserRepository);
  });

  it('deve ser capaz de validar um usuário com e-mail e senha corretos', async () => {
    const passwordHash = await hash('password123', 10);
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
    });

    await inMemoryUserRepository.create(user);

    const result = await validateUserUseCase.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(result).toEqual(user);
  });

  it('não deve ser capaz de validar um usuário se o e-mail estiver incorreto', async () => {
    const passwordHash = await hash('password123', 10);
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
    });

    await inMemoryUserRepository.create(user);

    await expect(
      validateUserUseCase.execute({
        email: 'wrongemail@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(AuthValuesIncorrectException);
  });

  it('não deve ser capaz de validar um usuário se a senha estiver incorreta', async () => {
    const passwordHash = await hash('password123', 10);
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
    });

    await inMemoryUserRepository.create(user);

    await expect(
      validateUserUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(AuthValuesIncorrectException);
  });
});
