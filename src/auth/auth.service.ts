import { Injectable } from '@nestjs/common';
import { MoreThanOrEqual } from 'typeorm';
import { User } from '../entities/user.entity';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './interface/current.user';
import { AuthRepository } from './auth.repository';
import { AppDataSource } from '../data-source';

// bcrypt がdockerだと使用できないhttps://qiita.com/curious_enginee/items/45f6ff65177b26971bad

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  // private async registrationValidation(): Promise<string> {
  //   const user = await this.user.findOne({ email });
  //   if (user != null && user.email) {
  //     return 'Email already exist';
  //   }

  //   return '';
  // }

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    // const { email, password } = createUserDto;
    console.log(createUserDto);

    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await AppDataSource.manager.save(user);
  }

  public async validateUserCredentials(
    loginDto: LoginDto
  ): Promise<CurrentUser> {
    const user = await AppDataSource.manager.findOneBy(User, {
      email: loginDto.email,
    });

    if (user == null) {
      return null;
    }

    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   return null;
    // }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.email = user.email;

    return currentUser;
  }

  public async login(loginDto: LoginDto): Promise<string> {
    const payload = {
      ...loginDto,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().day(1).format('YYYY/MM/DD'),
    };

    await this.authRepository.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<CurrentUser> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const user = await this.authRepository.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.email = user.email;

    return currentUser;
  }
}
