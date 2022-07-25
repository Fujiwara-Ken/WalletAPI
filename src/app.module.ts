import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { SplTokenController } from './spl-token/spl-token.controller';
import { SplTokenService } from './spl-token/spl-token.service';
import { SplTokenModule } from './spl-token/spl-token.module';
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
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
  controllers: [AppController, SplTokenController, NftController],
  providers: [AppService, SplTokenService, NftService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
