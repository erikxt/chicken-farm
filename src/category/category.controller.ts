import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CategoryInfo, LabelInfo, PrimaryCategory } from './category.entity';
import {
  CategoryInfoService,
  LabelInfoService,
  PrimaryCategoryService,
} from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly primaryCategoryService: PrimaryCategoryService,
    private readonly categoryInfoService: CategoryInfoService,
    private readonly labelInfoService: LabelInfoService,
  ) {}

  @Get()
  async getPrimaryCategories(): Promise<PrimaryCategory[]> {
    return this.primaryCategoryService.findAll();
  }

  @Get(':id')
  async getPrimaryCategory(@Param('id') id: number): Promise<PrimaryCategory> {
    const result: PrimaryCategory = await this.primaryCategoryService.findOne(
      id,
    );
    if (result === undefined) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get(':id/info')
  async getCategoryInfos(@Param('id') id: number): Promise<CategoryInfo[]> {
    return this.categoryInfoService.findAllByPrimaryCategoryId(id);
  }

  @Get(':primaryCategoryId/info/:categoryId')
  async getCategoryInfo(
    @Param('categoryId') categoryId: number,
  ): Promise<CategoryInfo> {
    return this.categoryInfoService.findOne(categoryId);
  }

  @Get(':primaryCategoryId/info/:categoryId/label')
  async getLabelInfos(
    @Param('categoryId') categoryId: number,
  ): Promise<LabelInfo[]> {
    return this.labelInfoService.findAllByCategoryId(categoryId);
  }

  @Get(':primaryCategoryId/info/:categoryId/label/:id')
  async getLabelInfo(
    @Param('categoryId') categoryId: number,
    @Param('id') id: number,
  ): Promise<LabelInfo> {
    return this.labelInfoService.findOne(categoryId, id);
  }
}
