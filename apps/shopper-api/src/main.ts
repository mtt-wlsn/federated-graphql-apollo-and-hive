import { NestFactory } from '@nestjs/core';
import { ShopperApiModule } from './shopper-api.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopperApiModule);
  await app.listen(process.env.SHOPPER_API_PORT);
}
bootstrap();
