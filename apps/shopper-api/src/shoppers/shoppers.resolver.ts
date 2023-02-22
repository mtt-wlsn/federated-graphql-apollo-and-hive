import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ShoppersService } from './shoppers.service';
import { Shopper } from './entities/shopper.entity';
import { CreateShopperInput } from './dto/create-shopper.input';
import { UpdateShopperInput } from './dto/update-shopper.input';
import { Address } from '../addresses/entities/address.entity';
import { DataloaderService } from '../dataloader/dataloader.service';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { Employer } from '../employers/entities/employer.entity';
import { EmployersService } from '../employers/employers.service';

@Resolver(() => Shopper)
export class ShoppersResolver {
  private readonly dataloaders: IDataloaders;

  constructor(
    private readonly shoppersService: ShoppersService,
    dataloaderService: DataloaderService,
    private readonly employersService: EmployersService,
  ) {
    this.dataloaders = dataloaderService.getLoaders();
  }

  @Mutation(() => Shopper)
  createShopper(
    @Args('createShopperInput') createShopperInput: CreateShopperInput,
  ) {
    return this.shoppersService.create(createShopperInput);
  }

  @Query(() => [Shopper], { name: 'shoppers' })
  findAll() {
    return this.shoppersService.findAll();
  }

  @Query(() => Shopper, { name: 'shopper' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.shoppersService.findOne(id);
  }

  @Mutation(() => Shopper)
  updateShopper(
    @Args('updateShopperInput') updateShopperInput: UpdateShopperInput,
  ) {
    return this.shoppersService.update(
      updateShopperInput.id,
      updateShopperInput,
    );
  }

  @Mutation(() => Shopper)
  removeShopper(@Args('id', { type: () => String }) id: string) {
    return this.shoppersService.remove(id);
  }

  @ResolveField('associatedAddresses', () => [Address])
  associatedAddresses(@Parent() shopper: Shopper) {
    return this.dataloaders.addressesLoader.load(shopper.id);
  }

  // @ResolveField('employer', () => Employer)
  // employer(@Parent() shopper: Shopper) {
  //   return this.employersService.findOne(shopper.employerId);
  // }

  @ResolveField('employer', () => Employer)
  employer(@Parent() shopper: Shopper) {
    return this.dataloaders.employersLoader.load(shopper.employerId);
  }
}
