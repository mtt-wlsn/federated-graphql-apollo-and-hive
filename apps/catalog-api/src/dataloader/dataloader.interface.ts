import * as DataLoader from 'dataloader';
import { Product } from '../products/entities/product.entity';

export interface IDataloaders {
  productsLoader: DataLoader<string, Product[]>;
}
