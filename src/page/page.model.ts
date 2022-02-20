import { Field, ObjectType } from '@nestjs/graphql';
import { Subject } from '../subject/subject.model';

@ObjectType()
export class PageInfo {
  @Field()
  endCursor: number;

  @Field()
  hasNextPage?: boolean;
}

@ObjectType()
export class Page {
  @Field()
  totalCount: number;

  @Field(() => [Subject])
  subjects?: Subject[];

  @Field(() => PageInfo)
  pageInfo?: PageInfo;
}
