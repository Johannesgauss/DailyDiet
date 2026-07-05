import { IsBoolean, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditMealBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsISO8601()
  @IsNotEmpty()
  dateTime: string;

  @IsBoolean()
  @IsNotEmpty()
  isOnDiet: boolean;
}
