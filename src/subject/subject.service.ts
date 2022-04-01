import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findAllFields(fields: any[]): Promise<Subject[]> {
    return this.subjectRepository.find({ select: fields });
  }

  async findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOne(id);
  }

  async findAllIds(): Promise<any[]> {
    let ids = await this.cacheManager.get<number[]>('ids');
    if (ids == null || ids.length == 0) {
      const subjects = await this.subjectRepository
        .createQueryBuilder('subject')
        .select(['subject.id'])
        .getMany();
      ids = subjects.map((x) => x.id);
      this.cacheManager.set('ids', ids);
    }
    return ids;
  }
}
