import { Injectable } from '@nestjs/common';
import { getTokenAmount } from './solana/getTokenAmount';
import { UserRepository } from './user.repository';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getTokenAmount(getTokenAmountDto: GetTokenAmountDto) {
    const tokenAmount = await getTokenAmount(getTokenAmountDto.walletAddress);
    console.log('service', tokenAmount);
    return tokenAmount;
  }
}
