import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({
    exposedHeaders: [
      'authorization',
      'Authorization',
      'x-amzn-Remapped-authorization',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Boba Backend')
    .setDescription('Documentation for Boba Backend')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const options = {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  };
  SwaggerModule.setup('doc', app, document, options);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.listen(port, () => {
    console.log(`Boba Backend listening`);
  });
}
bootstrap();
