import { NestFactory } from '@nestjs/core';
import { OrderApiModule } from './order-api.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderApiModule);
  await app.listen(process.env.ORDER_API_PORT);
}
bootstrap();
