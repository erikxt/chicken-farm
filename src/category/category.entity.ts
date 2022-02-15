import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('')
export class PrimaryCategory {
  @PrimaryColumn('bigint')
  primaryCategoryId: number;

  @Column('varchar')
  categoryName: string;

  @Column('int')
  subjectCount: number;
}

@Entity()
export class CategoryInfo {
  @PrimaryColumn('bigint')
  categoryId: number;

  @Column('varchar')
  categoryName: string;

  @Column('bigint')
  primaryCategoryId: number;
}

@Entity()
export class LabelInfo {
  @PrimaryColumn('bigint')
  categoryId: number;

  @PrimaryColumn('bigint')
  id: number;

  @Column('varchar')
  assembleId: string;

  @Column('varchar')
  labelName: string;

  @Column('int')
  subjectCount: number;
}
