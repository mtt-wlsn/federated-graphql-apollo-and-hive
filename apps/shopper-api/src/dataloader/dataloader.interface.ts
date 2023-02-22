import { Employer } from './../employers/entities/employer.entity';
import * as DataLoader from 'dataloader';
import { Address } from '../addresses/entities/address.entity';
import { Shopper } from '../shoppers/entities/shopper.entity';

export interface IDataloaders {
  addressesLoader: DataLoader<string, Address>;
  headquarterAddressLoader: DataLoader<string, Address>;
  employersLoader: DataLoader<string, Employer>;
  shoppersLoader: DataLoader<string, Shopper>;
}
