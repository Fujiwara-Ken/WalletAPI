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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup() {
    return await this.authService.signUp();
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Res({ passthrough: true }) res: Response) {
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
  async movies() {
    return ['Avatar', 'Avengers'];
  }
}
