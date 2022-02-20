import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelInfo } from 'src/category/category.entity';
import { Subject } from 'src/subject/subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(LabelInfo)
    private labelInfoRepository: Repository<LabelInfo>,
  ) {}

  async findPaginationByCondition(
    primaryCategoryId: number,
    categoryId: number,
    assembleIds: string[],
    difficulty: number,
    page: number,
    size: number,
  ): Promise<[Subject[], number]> {
    const offset = (page - 1) * size;
    const limit = size;
    return this.findByConditionAndOffset(
      primaryCategoryId,
      categoryId,
      assembleIds,
      difficulty,
      offset,
      limit,
    );
  }

  async findByConditionAndOffset(
    primaryCategoryId: number,
    categoryId: number,
    assembleIds: string[],
    difficulty: number,
    offset: number,
    limit: number,
  ): Promise<[Subject[], number]> {
    const queryBuilder = this.subjectRepository
      .createQueryBuilder('subject')
      .where(' 1 = 1');
    if (primaryCategoryId != undefined) {
      queryBuilder.andWhere({ primaryCategoryId: primaryCategoryId });
    }
    if (categoryId != undefined && assembleIds.length == 0) {
      const labelList = await this.labelInfoRepository.find({
        categoryId: categoryId,
      });
      const ids = labelList.map((x) => '"' + x.assembleId + '"');
      queryBuilder.andWhere(
        "JSON_OVERLAPS(assembleIds, CAST('[" + ids + "]' AS JSON))",
      );
    }
    if (difficulty != undefined) {
      queryBuilder.andWhere({ difficulty: difficulty });
    }
    if (difficulty != undefined) {
      queryBuilder.andWhere({ difficulty: difficulty });
    }
    if (assembleIds != undefined && assembleIds.length > 0) {
      const ids = assembleIds.map((x) => '"' + x + '"');
      queryBuilder.andWhere(
        "JSON_OVERLAPS(assembleIds, CAST('[" + ids + "]' AS JSON))",
      );
    }
    if (offset != undefined) {
      queryBuilder.skip(offset);
    }
    if (limit != undefined) {
      queryBuilder.take(limit);
    }
    return queryBuilder.getManyAndCount();
  }
}
