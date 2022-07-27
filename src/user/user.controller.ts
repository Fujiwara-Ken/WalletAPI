import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user-info/:user_id')
  async getUserInfo(
    @Param('user_id', ParseIntPipe) user_id: number
  ): Promise<Object> {
    const user = await this.userService.getUserInfo(user_id);
    return user;
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
