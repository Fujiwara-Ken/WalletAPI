import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotFoundException, Module } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { UserService } from './user.service';

import { AppTestingModule } from '../mocks/app-testing.module';

const testUser = {
  userId: 1,
  email: "test@email.com",
  password: "password",
  wallet_address: "walletAddress",
}


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

  it('getUserInfo', async () => {
    const createdUser = await userService.signUp()
    const foundUser = await userService.getUserInfo(1);
    // expect(val).toBe(expected)でvalがexpectedであることを確認
    expect(id).toBe(1);
    // expect(obj).toEqual(expected)でobjがexpectedと同じ要素を持つことを確認（deep-equal）
    expect(created).toEqual(testTodo);
  });

  it('get todo', async () => {
    const created = await service.createTodo(testTodo);
    const found = await service.findOne(created.id);
    expect(found).toEqual(created);
  });
