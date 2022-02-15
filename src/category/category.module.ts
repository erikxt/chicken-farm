import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryInfo, LabelInfo, PrimaryCategory } from './category.entity';
import {
  CategoryInfoService,
  LabelInfoService,
  PrimaryCategoryService,
} from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrimaryCategory, CategoryInfo, LabelInfo]),
  ],
  controllers: [CategoryController],
  providers: [PrimaryCategoryService, CategoryInfoService, LabelInfoService],
})
export class CategoryModule {}
