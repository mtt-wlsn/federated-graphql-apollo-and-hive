import { Injectable } from '@nestjs/common';
import { CreateShopperInput } from './dto/create-shopper.input';
import { UpdateShopperInput } from './dto/update-shopper.input';
import { Shopper } from './entities/shopper.entity';

@Injectable()
export class ShoppersService {
  create(createShopperInput: CreateShopperInput) {
    const shopper: Shopper = {
      id: crypto.randomUUID(),
      firstName: createShopperInput.firstName,
      lastName: createShopperInput.lastName,
      dateOfBirth: createShopperInput.dateOfBirth,
    };

    this.shoppers.push(shopper);

    return shopper;
  }

  findAll() {
    console.log(`ShopperService.findAll`);
    return this.shoppers;
  }

  findManyShoppersByIds(shopperIds: string[]) {
    console.log(`ShopperService.findManyShoppersByIds ${shopperIds}`);
    return this.shoppers.filter((x) => shopperIds.includes(x.id));
  }

  findShoppersByBatch(shopperIds: string[]): (Shopper | any)[] {
    const shoppers = this.findManyShoppersByIds(shopperIds);
    // DataLoader requires the mappedShoppers to be in the same order as the
    // input shopperIds.
    return shopperIds.map((shopperId) => {
      const shopper = shoppers.filter((shopper) => shopper.id === shopperId);
      return shopper ? shopper[0] : null;
    });
  }

  findOne(id: string) {
    console.log(`ShopperService.findOne ${id}`);
    return this.shoppers.find((x) => x.id == id);
  }

  update(id: string, updateShopperInput: UpdateShopperInput) {
    const shopper = this.shoppers.find((x) => x.id == id);

    if (!shopper) return;

    shopper.firstName = updateShopperInput.firstName ?? shopper.firstName;
    shopper.lastName = updateShopperInput.lastName ?? shopper.lastName;
    shopper.dateOfBirth = updateShopperInput.dateOfBirth ?? shopper.dateOfBirth;

    return shopper;
  }

  remove(id: string) {
    const shopperIndex = this.shoppers.findIndex((x) => x.id == id);

    if (shopperIndex < 0) return;

    this.shoppers.splice(shopperIndex, 1);
  }

  shoppers: Shopper[] = [
    {
      id: '1623c77c-2910-49f0-98e2-da151f7aab3f',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      employerId: 'a5462b29-7eb8-4a9d-aa70-a0f1a1bfe516',
    },
    {
      id: '23378b1f-d2ee-4896-835d-298a042cf300',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-02'),
      employerId: 'fe2d6f47-946e-4eb6-a6b3-cf97efb8aef9',
    },
    {
      id: 'fae93601-7fe4-489f-a4af-55cffe9ca6ae',
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: new Date('1990-01-03'),
      employerId: 'ea772960-03ed-443c-b389-ad056d3501db',
    },
  ];
}
