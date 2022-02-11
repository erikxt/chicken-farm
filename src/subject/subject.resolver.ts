import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Subject } from './subject.model';
import { SubjectService } from './subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private subjectService: SubjectService) {}

  @Query(() => Subject)
  async subject(@Args('id', { type: () => ID }) id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }
}
