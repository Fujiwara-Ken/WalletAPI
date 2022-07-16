import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { User } from '../entity/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'My random secret key never let others',
      signOptions: {
        expiresIn: 30,
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class UsersModule {}
