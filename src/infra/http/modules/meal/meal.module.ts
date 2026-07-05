import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { CreateMealUseCase } from 'src/modules/meal/useCases/createMealUseCase/createMealUseCase';
import { EditMealUseCase } from 'src/modules/meal/useCases/editMealUseCase/editMealUseCase';
import { DeleteMealUseCase } from 'src/modules/meal/useCases/deleteMealUseCase/deleteMealUseCase';
import { GetMealUseCase } from 'src/modules/meal/useCases/getMealUseCase/getMealUseCase';
import { GetManyMealsUseCase } from 'src/modules/meal/useCases/getManyMealsUseCase/getManyMealsUseCase';
import { GetMealMetricsUseCase } from 'src/modules/meal/useCases/getMealMetricsUseCase/getMealMetricsUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MealController],
  providers: [
    CreateMealUseCase,
    EditMealUseCase,
    DeleteMealUseCase,
    GetMealUseCase,
    GetManyMealsUseCase,
    GetMealMetricsUseCase,
  ],
})
export class MealModule {}
