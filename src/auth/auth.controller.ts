import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CurrentUser } from 'src/models/current.user';
import { RegistrationReqModel } from 'src/models/registration.req.model';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registerUser(@Body() reg: RegistrationReqModel) {
    return await this.authService.registerUser(reg);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.userId
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('fav-movies')
  @UseGuards(AuthGuard('jwt'))
  async movies(@Req() req) {
    return ['Avatar', 'Avengers'];
  }
}
