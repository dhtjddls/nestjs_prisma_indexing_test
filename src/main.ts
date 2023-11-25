import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DuplicatedExceptionFilter } from './common/exception-filters/duplicated-exception.filter';
import { HttpExceptionFilter } from './common/exception-filters/http-exceprion.filter';
import { InvalidExceptionFilter } from './common/exception-filters/invalid-exception.filter';
import { NotFoundExceptionFilter } from './common/exception-filters/not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './common/exception-filters/unauthorized-exception.filter';
import { UnexpectedErrorFilter } from './common/exception-filters/unexpected-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api', { exclude: ['/'] });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Server')
    .setDescription('The template API description')
    .setVersion('1.0')
    .addTag('server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // serializer
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new InvalidExceptionFilter(),
    new NotFoundExceptionFilter(),
    new UnexpectedErrorFilter(),
    new UnauthorizedExceptionFilter(),
    new DuplicatedExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
