import { ProductsService } from './../products/products.service';
import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class DataloaderService {
  constructor(private readonly productsService: ProductsService) {}

  getLoaders(): IDataloaders {
    const productsLoader = new DataLoader<string, Product[]>(
      async (keys: readonly string[]) =>
        this.productsService.findManyByOrderIdsBatch(keys as string[]),
      {
        cache: false,
      },
    );

    return {
      productsLoader,
    };
  }
}
