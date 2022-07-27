import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { SplTokenModule } from './spl-token/spl-token.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'wallet-db',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'develop',
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: ['src/migration/*.ts'],
    }),
    AuthModule,
    UserModule,
    SplTokenModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
