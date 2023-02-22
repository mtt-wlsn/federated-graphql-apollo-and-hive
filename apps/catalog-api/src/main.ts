import { NestFactory } from '@nestjs/core';
import { CatalogApiModule } from './catalog-api.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogApiModule);
  await app.listen(process.env.CATALOG_API_PORT);
}
bootstrap();
