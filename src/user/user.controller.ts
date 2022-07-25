import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('user-token/:user_id')
  async getTokenAmount(
    @Param('userId', ParseIntPipe) user_id: number
  ): Promise<User[]> {
    const user = await this.userService.getTokenAmount(user_id);
    return user;
  }
}
