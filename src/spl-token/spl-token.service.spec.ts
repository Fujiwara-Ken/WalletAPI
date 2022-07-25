import { Test, TestingModule } from '@nestjs/testing';
import { SplTokenService } from './spl-token.service';

describe('SplTokenService', () => {
  let service: SplTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplTokenService],
    }).compile();

    service = module.get<SplTokenService>(SplTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
