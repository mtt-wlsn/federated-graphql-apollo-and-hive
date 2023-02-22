import { ProductsService } from './../products/products.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { DataloaderService } from '../dataloader/dataloader.service';

@Resolver(() => Order)
export class OrdersResolver {
  private readonly dataloaders: IDataloaders;

  constructor(
    private readonly productsService: ProductsService,
    dataloaderService: DataloaderService,
  ) {
    this.dataloaders = dataloaderService.getLoaders();
  }

  @ResolveField(() => [Product])
  products(@Parent() order: Order) {
    // return this.productsService.findManyByOrderId(order.id);
    return this.dataloaders.productsLoader.load(order.id);
  }
}
