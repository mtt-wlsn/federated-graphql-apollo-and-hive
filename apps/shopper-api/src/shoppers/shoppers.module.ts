import { EmployersService } from './../employers/employers.service';
import { DataloaderModule } from './../dataloader/dataloader.module';
import { AddressesService } from './../addresses/addresses.service';
import { Module } from '@nestjs/common';
import { ShoppersService } from './shoppers.service';
import { ShoppersResolver } from './shoppers.resolver';

@Module({
  imports: [DataloaderModule],
  providers: [
    ShoppersResolver,
    ShoppersService,
    AddressesService,
    EmployersService,
  ],
  exports: [ShoppersService],
})
export class ShoppersModule {}
