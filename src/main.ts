import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());

  // corsの許可
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
