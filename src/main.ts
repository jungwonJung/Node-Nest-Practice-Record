import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin : 'http://localhost:3000',
    credentials : true
  })

  const config = new DocumentBuilder()
    .setTitle('mission')
    .setDescription('misson API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

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
