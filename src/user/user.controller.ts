import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TokenAmount } from '@solana/web3.js';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return await this.userService.signUp(createUserDto);
  }

  @Get('user-info/:userId')
  async getUserInfo(@Param('useId', ParseIntPipe) userId: number): Promise<User> {
    const res = await this.userService.getUserInfo(userId);
    return res;
  }

  // @UseGuards(JwtAuthGuard)
  @Post('get-token-amount')
  async getTokenAmount(@Body() getTokenAmountDto: GetTokenAmountDto): Promise<TokenAmount> {
    const userTokenAmount = await this.userService.getTokenAmount(getTokenAmountDto);
    return userTokenAmount;
  }

}
