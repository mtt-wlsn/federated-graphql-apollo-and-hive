import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Shopper } from '../shoppers/entities/shopper.entity';
import { Order } from './entities/orders.entity';
import { ShoppersService } from '../shoppers/shoppers.service';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { DataloaderService } from '../dataloader/dataloader.service';

@Resolver(() => Order)
export class OrdersResolver {
  private readonly dataloaders: IDataloaders;

  constructor(
    private readonly shoppersService: ShoppersService,
    dataloaderService: DataloaderService,
  ) {
    this.dataloaders = dataloaderService.getLoaders();
  }

  @ResolveField('shopper', () => Shopper)
  shopper(@Parent() order: Order) {
    //return this.shoppersService.findOne(order.shopperId);
    return this.dataloaders.shoppersLoader.load(order.shopperId);
  }
}
