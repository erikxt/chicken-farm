import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':id')
  async getSubject(@Param('id') id: number): Promise<Subject> {
    const subject: Subject = await this.subjectService.findOne(id);
    if (subject === undefined) {
      throw new NotFoundException();
    }
    return subject;
  }
}
