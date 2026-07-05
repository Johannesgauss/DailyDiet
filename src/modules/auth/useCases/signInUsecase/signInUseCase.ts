import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/User';
import { UserPayload } from '../../models/UserPayload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest): Promise<string> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    return this.jwtService.sign(payload);
  }
}
