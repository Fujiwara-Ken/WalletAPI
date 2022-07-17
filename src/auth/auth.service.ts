import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../entity/user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from './model/current.user';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
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
    const { email, password } = createUserDto;

    const user = this.create({ email, password });

    await this.save(user);

    return result;
  }

  public async validateUserCredentials(
    email: string,
    password: string
  ): Promise<CurrentUser> {
    const user = await this.user.findOne({ email });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

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

    await this.user.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<CurrentUser> {
    const currentDate = moment().day(1).format('YYYY/MM/DD');
    const user = await this.user.findOne({
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
