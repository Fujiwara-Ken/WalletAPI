import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../entity/user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private jwtService: JwtService
  ) {}

  private async registrationValidation(): Promise<string> {
    if (!regModel.email) {
      return "Email can't be empty";
    }

    const user = await this.user.findOne({ email });
    if (user != null && user.email) {
      return 'Email already exist';
    }

    return '';
  }

  public async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email, password: hashPassword });

    await this.save(user);

    return result;
  }

  public async validateUserCredentials(
    email: string,
    password: string
  ): Promise<CurrentUser> {
    const user = await this.user.findOne({ email: email });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const currentUser = new CurrentUser();
    currentUser.userId = user.userId;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;

    return currentUser;
  }

  public async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
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
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;

    return currentUser;
  }
}
