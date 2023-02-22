import * as DataLoader from 'dataloader';
import { Address } from '../addresses/entities/address.entity';
import { AddressesService } from './../addresses/addresses.service';
import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { Shopper } from '../shoppers/entities/shopper.entity';
import { ShoppersService } from '../shoppers/shoppers.service';
import { Employer } from '../employers/entities/employer.entity';
import { EmployersService } from '../employers/employers.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly shopperService: ShoppersService,
    private readonly addressesService: AddressesService,
    private readonly employersService: EmployersService,
  ) {}

  getLoaders(): IDataloaders {
    const addressesLoader = new DataLoader<string, Address>(
      async (keys: readonly string[]) =>
        this.addressesService.findShopperAddressesByBatch(keys as string[]),
      {
        cache: false,
      },
    );

    const headquarterAddressLoader = new DataLoader<string, Address>(
      async (keys: readonly string[]) =>
        this.addressesService.findManyAddressesByBatch(keys as string[]),
      {
        cache: false,
      },
    );

    const employersLoader = new DataLoader<string, Employer>(
      async (keys: readonly string[]) =>
        this.employersService.findEmployersByBatch(keys as string[]),
      {
        cache: false,
      },
    );

    const shoppersLoader = new DataLoader<string, Shopper>(
      async (keys: readonly string[]) =>
        this.shopperService.findShoppersByBatch(keys as string[]),
      {
        cache: false,
      },
    );

    return {
      addressesLoader,
      headquarterAddressLoader,
      employersLoader,
      shoppersLoader,
    };
  }
}
