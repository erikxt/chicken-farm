import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

const FIELDS = ['id', 'subjectName'];
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':id')
  async getSubject(@Param('id') id): Promise<Subject> {
    const subject: Subject = await this.subjectService.findOne(id);
    if (subject === undefined) {
      throw new NotFoundException();
    }
    return subject;
  }

  @Get('')
  async getSubjectId(@Query('fields') fields: string): Promise<Subject[]> {
    const fieldArray = fields != undefined ? fields.split(',') : [];
    fieldArray.map((key) => {
      if (!FIELDS.includes(key)) {
        throw new BadRequestException();
      }
    });
    const result = await this.subjectService.findAllFields(fieldArray);
    return result;
  }
}
