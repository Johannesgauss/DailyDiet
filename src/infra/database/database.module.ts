import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { MealRepository } from 'src/modules/meal/repositories/MealRepository';
import { PrismaMealRepository } from './prisma/repositories/PrismaMealRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: MealRepository,
      useClass: PrismaMealRepository,
    },
  ],
  exports: [UserRepository, MealRepository],
})
export class DatabaseModule {}
