import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('Документация по API')
    .setVersion('1.0.0')
    .addTag('Shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.listen(PORT, () => {
      console.log(`The server has been started on port ${PORT}`);
  })
}
bootstrap();
