import { BadRequestException } from '@nestjs/common';

export class UserWithSameEmailException extends BadRequestException {
  constructor() {
    super('Já existe um usuário cadastrado com este e-mail.');
  }
}
