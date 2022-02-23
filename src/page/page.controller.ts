import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Subject } from '../subject/subject.entity';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('')
  @ApiQuery({ name: 'primaryCategoryId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'assembleIds', required: false })
  @ApiQuery({ name: 'difficulty', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  async getPager(
    @Query('primaryCategoryId') primaryCategoryId: number,
    @Query('categoryId') categoryId: number,
    @Query('assembleIds') assembleIds: string,
    @Query('difficulty') difficulty: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<[Subject[], number]> {
    if (page == undefined) {
      page = 1;
    }
    if (size == undefined) {
      size = 5;
    }
    return this.pageService.findPaginationByCondition(
      primaryCategoryId,
      categoryId,
      assembleIds != undefined && assembleIds != ''
        ? assembleIds.split(',')
        : [],
      difficulty,
      page,
      size,
    );
  }
}
