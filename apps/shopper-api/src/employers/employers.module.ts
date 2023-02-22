import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersResolver } from './employers.resolver';
import { AddressesService } from '../addresses/addresses.service';
import { DataloaderModule } from '../dataloader/dataloader.module';

@Module({
  imports: [DataloaderModule],
  providers: [EmployersResolver, EmployersService, AddressesService],
})
export class EmployersModule {}
