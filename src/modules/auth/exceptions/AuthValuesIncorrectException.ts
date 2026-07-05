import { UnauthorizedException } from '@nestjs/common';

export class AuthValuesIncorrectException extends UnauthorizedException {
  constructor() {
    super('E-mail ou senha incorretos.');
  }
}
