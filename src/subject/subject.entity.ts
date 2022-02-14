import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryColumn('bigint')
  id: number;

  @Column('varchar')
  subjectName: string;

  @Column('text')
  subjectAnswer: string;

  @Column('int')
  difficulty: number;

  @Column('json')
  assembleIds: object;

  @Column('json')
  labelNames: object;

  @Column('bigint')
  primaryCategoryId: number;
}
