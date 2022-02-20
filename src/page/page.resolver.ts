import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Page, PageInfo } from './page.model';
import { PageService } from './page.service';

@Resolver(() => Page)
export class PageResolver {
  constructor(private pageService: PageService) {}

  @Query(() => Page)
  async page(
    @Args('primaryCategoryId', { type: () => Int, nullable: true })
    primaryCategoryId: number,
    @Args('categoryId', { type: () => Int, nullable: true }) categoryId: number,
    @Args('assembleIds', { type: () => [String], nullable: true })
    assembleIds: string[],
    @Args('difficulty', { type: () => Int, nullable: true }) difficulty: number,
    @Args('offset', { type: () => Int, nullable: true }) offset: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ): Promise<Page> {
    const [list, count] = await this.pageService.findByConditionAndOffset(
      primaryCategoryId,
      categoryId,
      assembleIds,
      difficulty,
      offset,
      limit,
    );
    const result = new Page();
    result.totalCount = count;
    result.subjects = list;
    const pageInfo = new PageInfo();
    pageInfo.hasNextPage = offset + limit >= count ? false : true;
    pageInfo.endCursor = offset + limit < count ? offset + limit : count;
    result.pageInfo = pageInfo;
    return result;
  }
}
