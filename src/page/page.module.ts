import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { SubjectModule } from 'src/subject/subject.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subject/subject.entity';
import { LabelInfo } from 'src/category/category.entity';
import { PageResolver } from './page.resolver';

@Module({
  imports: [SubjectModule, TypeOrmModule.forFeature([Subject, LabelInfo])],
  providers: [PageService, PageResolver],
  controllers: [PageController],
})
export class PageModule {}
