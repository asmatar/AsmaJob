import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// Configuration de Swagger
  const config = new DocumentBuilder()
      .setTitle('AsmaJob API')
      .setDescription('Documentation de l\'API du backend AsmaJob')
      .setVersion('1.0')
      .addBearerAuth() // Si vous utilisez un token d'authentification plus tard
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // L'interface sera accessible sur /api
  // to put a prefix value on the api url
  app.setGlobalPrefix('v1');
  // to configure cors origin
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // to use token for the API call
    credentials: true,
  })
  // Activer Helmet avec les options par défaut
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
