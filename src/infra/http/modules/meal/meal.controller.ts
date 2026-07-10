import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CreateMealUseCase } from 'src/modules/meal/useCases/createMealUseCase/createMealUseCase';
import { EditMealUseCase } from 'src/modules/meal/useCases/editMealUseCase/editMealUseCase';
import { DeleteMealUseCase } from 'src/modules/meal/useCases/deleteMealUseCase/deleteMealUseCase';
import { GetMealUseCase } from 'src/modules/meal/useCases/getMealUseCase/getMealUseCase';
import { GetManyMealsUseCase } from 'src/modules/meal/useCases/getManyMealsUseCase/getManyMealsUseCase';
import { GetMealMetricsUseCase, GetMealMetricsResponse } from 'src/modules/meal/useCases/getMealMetricsUseCase/getMealMetricsUseCase';
import type { AuthenticatedRequestModel } from 'src/infra/http/modules/auth/models/authenticatedRequestModel';
import { CreateMealBody } from './dtos/CreateMealBody';
import { EditMealBody } from './dtos/EditMealBody';
import { MealViewModel } from './viewModels/MealViewModel';

@Controller('meals')
export class MealController {
  constructor(
    private createMealUseCase: CreateMealUseCase,
    private editMealUseCase: EditMealUseCase,
    private deleteMealUseCase: DeleteMealUseCase,
    private getMealUseCase: GetMealUseCase,
    private getManyMealsUseCase: GetManyMealsUseCase,
    private getMealMetricsUseCase: GetMealMetricsUseCase,
  ) {}

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateMealBody,
  ) {
    const { name, description, dateTime, isOnDiet } = body;
    const userId = request.user.id;

    const meal = await this.createMealUseCase.execute({
      name,
      description,
      dateTime: new Date(dateTime),
      isOnDiet,
      userId,
    });

    return MealViewModel.toHttp(meal);
  }

  @Put(':id')
  async edit(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') mealId: string,
    @Body() body: EditMealBody,
  ) {
    const { name, description, dateTime, isOnDiet } = body;
    const userId = request.user.id;

    const meal = await this.editMealUseCase.execute({
      mealId,
      userId,
      name,
      description,
      dateTime: new Date(dateTime),
      isOnDiet,
    });

    return MealViewModel.toHttp(meal);
  }

  @Delete(':id')
  async delete(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') mealId: string,
  ) {
    const userId = request.user.id;

    await this.deleteMealUseCase.execute({
      mealId,
      userId,
    });
  }

  @Get('metrics')
  async getMetrics(@Request() request: AuthenticatedRequestModel): Promise<GetMealMetricsResponse> {
    const userId = request.user.id;

    return await this.getMealMetricsUseCase.execute({
      userId,
    });
  }

  @Get(':id')
  async get(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') mealId: string,
  ) {
    const userId = request.user.id;

    const meal = await this.getMealUseCase.execute({
      mealId,
      userId,
    });

    return MealViewModel.toHttp(meal);
  }

  @Get()
  async getMany(@Request() request: AuthenticatedRequestModel) {
    const userId = request.user.id;

    const meals = await this.getManyMealsUseCase.execute({
      userId,
    });

    return meals.map(MealViewModel.toHttp);
  }
}
