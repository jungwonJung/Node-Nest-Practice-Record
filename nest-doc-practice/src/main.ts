import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,  //  input 데이터타입 변환
    }) // 인풋값 유효성체크를 위해 파이프 ( 인풋값이 지나가는  파이프)
  )
  await app.listen(3000);
}
bootstrap();
