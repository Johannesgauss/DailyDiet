import { SignInUseCase } from './signInUseCase';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../user/entities/User';

describe('Caso de Uso de Login', () => {
  let signInUseCase: SignInUseCase;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    } as unknown as jest.Mocked<JwtService>;

    signInUseCase = new SignInUseCase(jwtService);
  });

  it('deve ser capaz de fazer login e gerar um token JWT', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashed-password',
      createdAt: new Date('2026-07-09T12:00:00Z'),
    });

    const token = await signInUseCase.execute({ user });

    expect(token).toBe('mocked-jwt-token');
    expect(jwtService.sign).toHaveBeenCalledWith({
      sub: user.id,
      email: 'johndoe@example.com',
      name: 'John Doe',
      createdAt: user.createdAt.toJSON(),
    });
  });
});
