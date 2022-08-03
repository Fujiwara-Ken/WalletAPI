import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { NotFoundException } from '@nestjs/common';

const mockUser1 = {
  id: 1,
  email: 'aaa@email.com',
  password: 'password',
  wallet_address: 'walletAddresswalletAddresswalletAddress',
};

const mockUserRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getUserInfo', () => {
    it('正常系', async () => {
      const expected = {
        userId: mockUser1.id,
        email: mockUser1.email,
        password: mockUser1.password,
        wallet_address: mockUser1.wallet_address,
      };

      userRepository.getUser(expected);
      const result = await userService.getUserInfo(1);
      expect(result).toEqual(expected);
    });

    it('異常系: ユーザーが存在しない', async () => {
      userRepository.getUser(null);
      await expect(userService.getUserInfo(100)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
