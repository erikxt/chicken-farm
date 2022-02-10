import { Connection } from 'typeorm';
import { Subject } from './subject.entity';

export const subjectProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Subject),
    inject: ['DATABASE_CONNECTION'],
  },
];
