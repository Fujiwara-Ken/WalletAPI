import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getTokenAmount } from './solana/getTokenAmount';
import { UserRepository } from './user.repository';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { User } from 'src/entities/user.entity';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserInfo(userId: number): Promise<User> {
    const response = await this.userRepository.getUser(userId);

    if (!response) {
      throw new InternalServerErrorException('User is not found');
    }
    return response;
  }

  public async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    console.log('service', tokenAmount);
    return tokenAmount;
  }
}
