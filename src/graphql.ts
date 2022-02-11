/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Subject {
  id: string;
  subjectName?: Nullable<string>;
  subjectAnswer?: Nullable<string>;
  difficulty?: Nullable<number>;
  assembleIds?: Nullable<Nullable<string>[]>;
  labelNames?: Nullable<Nullable<string>[]>;
  primaryCategoryId?: Nullable<number>;
}

export interface IQuery {
  subject(id: string): Nullable<Subject> | Promise<Nullable<Subject>>;
}

type Nullable<T> = T | null;
