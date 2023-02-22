import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmployersService } from './employers.service';
import { Employer } from './entities/employer.entity';
import { CreateEmployerInput } from './dto/create-employer.input';
import { UpdateEmployerInput } from './dto/update-employer.input';
import { AddressesService } from '../addresses/addresses.service';
import { Address } from '../addresses/entities/address.entity';
import { DataloaderService } from '../dataloader/dataloader.service';
import { IDataloaders } from '../dataloader/dataloader.interface';

@Resolver(() => Employer)
export class EmployersResolver {
  private readonly dataloaders: IDataloaders;

  constructor(
    private readonly employersService: EmployersService,
    private readonly addressesService: AddressesService,
    dataloaderService: DataloaderService,
  ) {
    this.dataloaders = dataloaderService.getLoaders();
  }

  @Mutation(() => Employer)
  createEmployer(
    @Args('createEmployerInput') createEmployerInput: CreateEmployerInput,
  ) {
    return this.employersService.create(createEmployerInput);
  }

  @Query(() => [Employer], { name: 'employers' })
  findAll() {
    return this.employersService.findAll();
  }

  @Query(() => Employer, { name: 'employer' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.employersService.findOne(id);
  }

  @Mutation(() => Employer)
  updateEmployer(
    @Args('updateEmployerInput') updateEmployerInput: UpdateEmployerInput,
  ) {
    return this.employersService.update(
      updateEmployerInput.id,
      updateEmployerInput,
    );
  }

  @Mutation(() => Employer)
  removeEmployer(@Args('id', { type: () => String }) id: string) {
    return this.employersService.remove(id);
  }

  // @ResolveField('headquarterAddress', () => Address)
  // headquarterAddress(@Parent() employer: Employer): Address {
  //   return this.addressesService.findOne(employer.headquarterAddressId);
  // }

  @ResolveField('headquarterAddress', () => Address)
  headquarterAddress(@Parent() employer: Employer) {
    if (!employer.headquarterAddressId) return null;
    return this.dataloaders.headquarterAddressLoader.load(
      employer.headquarterAddressId,
    );
  }
}
