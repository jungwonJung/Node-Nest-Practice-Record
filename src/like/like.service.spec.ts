import { Test, TestingModule } from '@nestjs/testing';
import { LikeRecordService } from './like.service';

describe('LikeService', () => {
  let service: LikeRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeRecordService],
    }).compile();

    service = module.get<LikeRecordService>(LikeRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
