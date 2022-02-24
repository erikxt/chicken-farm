import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const docOptions = new DocumentBuilder().setTitle('nest swagger').build();
  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('/swagger', app, document, {
    customCssUrl:
      'https://cdn.bootcdn.net/ajax/libs/swagger-ui/4.3.0/swagger-ui.css',
  });
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,POST',
    optionsSuccessStatus: 204,
  });
  await app.listen(3000);
}
bootstrap();
