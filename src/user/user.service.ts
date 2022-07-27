import { Injectable } from '@nestjs/common';
import { getTokenAmount } from './solana/getTokenAmount';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getTokenAmount(walletAddress) {
    const tokenAmount = getTokenAmount(walletAddress);
    console.log('service', tokenAmount);
    return tokenAmount;
  }
}
