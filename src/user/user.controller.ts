import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user-info/:userId')
  async getUserInfo(
    @Param('useId', ParseIntPipe) userId: number
  ): Promise<User> {
    const response = await this.userService.getUserInfo(userId);
    return response;
  }

  // @UseGuards(JwtAuthGuard)
  @Post('get-token-amount')
  async getTokenAmount(
    @Body() getTokenAmountDto: GetTokenAmountDto
  ): Promise<any> {
    const user = await this.userService.getTokenAmount(getTokenAmountDto);
    return user;
  }
}
