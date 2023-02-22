import { EmployersService } from './../employers/employers.service';
import { ShoppersService } from '../shoppers/shoppers.service';
import { AddressesService } from './../addresses/addresses.service';
import { DataloaderService } from './dataloader.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    DataloaderService,
    ShoppersService,
    AddressesService,
    EmployersService,
  ],
  exports: [DataloaderService],
})
export class DataloaderModule {}
