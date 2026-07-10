import { IsBoolean, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditMealBody {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsOptional()
  description: string;

  @IsISO8601({}, { message: 'A data e hora deve estar em um formato ISO 8601 válido.' })
  @IsNotEmpty({ message: 'A data e hora é obrigatória.' })
  dateTime: string;

  @IsBoolean({ message: 'O campo isOnDiet deve ser um valor booleano (true/false).' })
  @IsNotEmpty({ message: 'O status da dieta é obrigatório.' })
  isOnDiet: boolean;
}
