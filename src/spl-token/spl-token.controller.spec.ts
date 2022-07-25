import { Test, TestingModule } from '@nestjs/testing';
import { SplTokenController } from './spl-token.controller';

describe('SplTokenController', () => {
  let controller: SplTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SplTokenController],
    }).compile();

    controller = module.get<SplTokenController>(SplTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
