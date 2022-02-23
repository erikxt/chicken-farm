import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { SubjectModule } from '../subject/subject.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../subject/subject.entity';
import { LabelInfo } from '../category/category.entity';
import { PageResolver } from './page.resolver';

@Module({
  imports: [SubjectModule, TypeOrmModule.forFeature([Subject, LabelInfo])],
  providers: [PageService, PageResolver],
  controllers: [PageController],
})
export class PageModule {}
