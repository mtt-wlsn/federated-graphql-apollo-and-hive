import { ProductsService } from '../products/products.service';
import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';

@Module({
  providers: [DataloaderService, ProductsService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
