import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

describe('SubjectController', () => {
  let subjectController: SubjectController;
  // let subjectService: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [
        {
          provide: SubjectService,
          useValue: {
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ id: id })),
          },
        },
      ],
    }).compile();

    // subjectService = module.get<SubjectService>(SubjectService);
    subjectController = module.get<SubjectController>(SubjectController);
  });

  describe('getSubject', () => {
    it('should return same id', async () => {
      expect((await subjectController.getSubject(556)).id).toBe(556);
    });
  });
});
