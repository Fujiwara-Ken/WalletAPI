import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('user-token/:userId')
  async getTokenAmount(
    @Param('userId', ParseIntPipe) user_id: number
    @Body() getTokenAmountDto: GetTokenAmountDto,
  ): Promise<User[]> {
    const user = await this.userService.getTokenAmount(getTokenAmountDto);
    return user;
  }
}
