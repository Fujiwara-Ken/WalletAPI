import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotFoundException, Module } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { UserService } from './user.service';

import { AppTestingModule } from '../mocks/app-testing.module';

const testUser = {
  userId: 1,
  email: 'test@email.com',
  password: 'password',
  wallet_address: 'walletAddress',
};

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;

  // beforeAll(): describeの最初に呼ばれる
  // afterAll(): describeの最後に呼ばれる

  // 各`it()`/`test()`の前に呼ばれるコード
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppTestingModule, TypeOrmModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  // 各`it()`/`test()`の後に呼ばれるコード
  afterEach(() => {
    return module.close();
  });

  // it()はtest()のエイリアス
  it('should be defined', () => {
    // toBeDefined()で，定義されていることを確認
    expect(userService).toBeDefined();
  });

  it('create user', async () => {
    const createdUser = await userService.signUp(testUser);
    expect(createdUser.userId).toBe(1);
    expect(createdUser).toEqual(testUser);
  });

  it('get user info', async () => {
    const createdUser = await userService.signUp(testUser);
    const foundedUser = await userService.getUserInfo(createdUser.userId);
    expect(foundedUser.userId).toBe(1);
    expect(createdUser).toEqual(testUser);
  });
});
