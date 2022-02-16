import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CategoryInfo, LabelInfo, PrimaryCategory } from './category.entity';
import {
  CategoryInfoService,
  LabelInfoService,
  PrimaryCategoryService,
} from './category.service';

@Controller()
export class CategoryController {
  constructor(
    private readonly primaryCategoryService: PrimaryCategoryService,
    private readonly categoryInfoService: CategoryInfoService,
    private readonly labelInfoService: LabelInfoService,
  ) {}

  @Get('category')
  async getPrimaryCategories(): Promise<PrimaryCategory[]> {
    return this.primaryCategoryService.findAll();
  }

  @Get('category/:id')
  async getPrimaryCategory(@Param('id') id: number): Promise<PrimaryCategory> {
    const result: PrimaryCategory = await this.primaryCategoryService.findOne(
      id,
    );
    if (result === undefined) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get('category/:id/info')
  async getCategoryInfos(@Param('id') id: number): Promise<CategoryInfo[]> {
    return this.categoryInfoService.findAllByPrimaryCategoryId(id);
  }

  @Get('category/:primaryCategoryId/info/:categoryId')
  async getCategoryInfo(
    @Param('categoryId') categoryId: number,
  ): Promise<CategoryInfo> {
    return this.categoryInfoService.findOne(categoryId);
  }

  @Get('category/:primaryCategoryId/info/:categoryId/label')
  async getLabelInfos(
    @Param('categoryId') categoryId: number,
  ): Promise<LabelInfo[]> {
    return this.labelInfoService.findAllByCategoryId(categoryId);
  }

  @Get('label')
  async getAllLabelInfos(): Promise<LabelInfo[]> {
    return this.labelInfoService.findAll();
  }

  @Get('category/:primaryCategoryId/label')
  async getLabelInfo(
    @Param('primaryCategoryId') primaryCategoryId: number,
  ): Promise<LabelInfo[]> {
    return this.labelInfoService.findAllByPrimaryCategoryId(primaryCategoryId);
  }
}
