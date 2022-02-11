import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subject {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  subjectName?: string;

  @Field({ nullable: true })
  subjectAnswer?: string;

  @Field(() => Int)
  difficulty: number;

  @Field(() => [String])
  assembleIds?: object;

  @Field(() => [String])
  labelNames?: object;

  @Field(() => Int)
  primaryCategoryId: number;
}
