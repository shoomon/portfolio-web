import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const swaggerOptions = {
    swaggerOptions: {
      timeago: true, // 상대적인 시간 표시 활성화
    },
  };

  SwaggerModule.setup('api-doc', app, document, swaggerOptions);

  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  // }))
  await app.listen(3000);
}
bootstrap();
