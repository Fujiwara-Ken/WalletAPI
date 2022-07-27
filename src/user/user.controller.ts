import { Body, Controller, Post } from '@nestjs/common';
import { GetTokenAmountDto } from './dto/get-token-amount.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('user-token')
  async getTokenAmount(
    @Body() getTokenAmountDto: GetTokenAmountDto
  ): Promise<any> {
    const user = await this.userService.getTokenAmount(getTokenAmountDto);
    return user;
  }
}
