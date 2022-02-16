import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Repository } from 'typeorm';
import { CategoryInfo, LabelInfo, PrimaryCategory } from './category.entity';

@Injectable()
export class PrimaryCategoryService {
  constructor(
    @InjectRepository(PrimaryCategory)
    private primaryCategoryRepository: Repository<PrimaryCategory>,
  ) {}

  async findAll(): Promise<PrimaryCategory[]> {
    return this.primaryCategoryRepository.find();
  }

  async findOne(id: number): Promise<PrimaryCategory> {
    return this.primaryCategoryRepository.findOne(id);
  }
}

@Injectable()
export class CategoryInfoService {
  constructor(
    @InjectRepository(CategoryInfo)
    private categoryInfoRepository: Repository<CategoryInfo>,
  ) {}

  async findAllByPrimaryCategoryId(
    primaryCategoryId: number,
  ): Promise<CategoryInfo[]> {
    return this.categoryInfoRepository.find({
      primaryCategoryId: primaryCategoryId,
    });
  }

  async findOne(id: number): Promise<CategoryInfo> {
    return this.categoryInfoRepository.findOne(id);
  }
}

@Injectable()
export class LabelInfoService {
  constructor(
    @InjectRepository(CategoryInfo)
    private categoryInfoRepository: Repository<CategoryInfo>,
    @InjectRepository(LabelInfo)
    private labelInfoRepository: Repository<LabelInfo>,
  ) {}

  async findAllByCategoryId(categoryId: number): Promise<LabelInfo[]> {
    return this.labelInfoRepository.find({
      categoryId: categoryId,
    });
  }

  async findOne(categoryId: number, id: number): Promise<LabelInfo> {
    return this.labelInfoRepository.findOne({ categoryId: categoryId, id: id });
  }

  async findAllByPrimaryCategoryId(
    primaryCategoryId: number,
  ): Promise<LabelInfo[]> {
    const list = await this.categoryInfoRepository.find({
      primaryCategoryId: primaryCategoryId,
    });
    const categoryIds: number[] = list.map((item) => item.categoryId);
    return this.labelInfoRepository.find({
      categoryId: In(categoryIds),
    });
  }

  async findAll(): Promise<LabelInfo[]> {
    return this.labelInfoRepository.find();
  }
}
