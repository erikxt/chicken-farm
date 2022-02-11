import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(JwtAuthGuard) // validate jwt token
  @Get(':id')
  async getHello(@Param('id') id): Promise<Subject> {
    const subject: Subject = await this.subjectService.findOne(id);
    if (subject === undefined) {
      throw new NotFoundException();
    }
    return subject;
  }
}
