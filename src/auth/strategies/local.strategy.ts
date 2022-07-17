import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CurrentUser } from 'src/auth/model/current.user';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CurrentUser> {
    const user = await this.authService.validateUserCredentials(
      email,
      password
    );

    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
