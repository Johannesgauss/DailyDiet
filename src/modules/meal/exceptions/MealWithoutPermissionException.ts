import { ForbiddenException } from '@nestjs/common';

interface MealWithoutPermissionExceptionProps {
  actionName: string;
}

export class MealWithoutPermissionException extends ForbiddenException {
  constructor({ actionName }: MealWithoutPermissionExceptionProps) {
    super(`Você não tem permissão para ${actionName} esta refeição.`);
  }
}
