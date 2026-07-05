import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/SignInBody';
import { validate } from 'class-validator';

@Injectable()
export class SignInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length > 0) {
      const errors = validations.map((err) => ({
        property: err.property,
        messages: Object.values(err.constraints || {}),
      }));
      throw new BadRequestException({ message: 'Dados de login inválidos', errors });
    }

    next();
  }
}
