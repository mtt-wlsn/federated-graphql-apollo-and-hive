import { Injectable } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  create(createAddressInput: CreateAddressInput) {
    const address: Address = {
      id: crypto.randomUUID(),
      shopperId: createAddressInput.shopperId,
      addressLine1: createAddressInput.addressLine1,
      addressLine2: createAddressInput.addressLine2,
      city: createAddressInput.city,
      state: createAddressInput.state,
      postalCode: createAddressInput.postalCode,
    };

    this.addresses.push(address);

    return address;
  }

  findAll() {
    console.log(`AddressesService.findAll`);
    return this.addresses;
  }

  findManyById(ids: string[]) {
    console.log(`AddressesService.findManyById ${ids}`);
    return this.addresses.filter((x) => ids.includes(x.id));
  }

  findManyAddressesByBatch(ids: string[]): (Address | any)[] {
    const addresses = this.findManyById(ids);
    // DataLoader requires the mappedAddresses to be in the same order as the
    // input shopperIds.
    return ids.map((id) => {
      const address = addresses.filter((address) => address.id === id);
      return address ? address[0] : null;
    });
  }

  findByShopperId(shopperId: string) {
    console.log(`AddressService.findByShopperId ${shopperId}`);
    return this.addresses.filter((x) => x.shopperId == shopperId);
  }

  findManyAddressesByShopperIds(shopperIds: string[]) {
    console.log(`AddressService.findManyAddressesByShopperIds ${shopperIds}`);
    return this.addresses.filter((x) => shopperIds.includes(x.shopperId));
  }

  findShopperAddressesByBatch(shopperIds: string[]): (Address | any)[] {
    const addresses = this.findManyAddressesByShopperIds(shopperIds);
    // DataLoader requires the mappedAddresses to be in the same order as the
    // input shopperIds.
    return shopperIds.map(
      (shopperId) =>
        addresses.filter((address) => address.shopperId === shopperId) || null,
    );
  }

  findOne(id: string) {
    console.log(`AddressService.findOne ${id}`);
    return this.addresses.find((x) => x.id == id);
  }

  update(id: string, updateAddressInput: UpdateAddressInput) {
    const address = this.addresses.find((x) => x.id == id);

    if (!address) return;

    address.shopperId = updateAddressInput.shopperId ?? address.shopperId;
    address.addressLine1 =
      updateAddressInput.addressLine1 ?? address.addressLine1;
    address.addressLine2 =
      updateAddressInput.addressLine2 ?? address.addressLine2;
    address.city = updateAddressInput.city ?? address.city;
    address.state = updateAddressInput.state ?? address.state;
    address.postalCode = updateAddressInput.postalCode ?? address.postalCode;

    return address;
  }

  remove(id: string) {
    const addressIndex = this.addresses.findIndex((x) => x.id == id);

    if (addressIndex < 0) return;

    this.addresses.splice(addressIndex, 1);
  }

  addresses: Address[] = [
    {
      id: '1f04b794-747f-4767-ba86-93e13ae961a8',
      shopperId: '1623c77c-2910-49f0-98e2-da151f7aab3f',
      addressLine1: '123 Main St',
      city: 'Austin',
      state: 'TX',
      postalCode: '12345',
    },
    {
      id: '33fbd3e3-6084-416d-a80e-dc12a527bea6',
      shopperId: '1623c77c-2910-49f0-98e2-da151f7aab3f',
      addressLine1: '456 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '54321',
    },
    {
      id: '1f04b794-747f-4767-ba86-93e13ae961a8',
      shopperId: '23378b1f-d2ee-4896-835d-298a042cf300',
      addressLine1: '321 Main St',
      city: 'Austin',
      state: 'TX',
      postalCode: '12345',
    },
    {
      id: '33fbd3e3-6084-416d-a80e-dc12a527bea6',
      shopperId: 'fae93601-7fe4-489f-a4af-55cffe9ca6ae',
      addressLine1: '654 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '54321',
    },
    {
      id: '493735c6-687b-46c2-99b1-aef7acf5b92b',
      addressLine1: '321 Main St',
      city: 'Austin',
      state: 'TX',
      postalCode: '12345',
    },
    {
      id: '3d0d6053-eb4f-4d69-a43b-0e4cc1e51092',
      addressLine1: '654 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '54321',
    },
  ];
}
