import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  create(createOrderInput: CreateOrderInput): Order {
    const order: Order = {
      id: crypto.randomUUID(),
      shopperId: createOrderInput.shopperId,
      quantity: createOrderInput.quantity,
      totalPrice: createOrderInput.totalPrice,
    };

    this.orders.push(order);

    return order;
  }

  findAll(): Order[] {
    console.log(`OrdersService.findAll`);
    return this.orders;
  }

  findOne(id: string): Order {
    console.log(`OrdersService.findOne ${id}`);
    return this.orders.find((x) => x.id == id);
  }

  update(id: string, updateOrderInput: UpdateOrderInput): Order {
    const order = this.orders.find((x) => x.id == id);

    if (!order) return;

    order.shopperId = updateOrderInput.shopperId ?? order.shopperId;
    order.quantity = updateOrderInput.quantity ?? order.quantity;
    order.totalPrice = updateOrderInput.totalPrice ?? order.totalPrice;

    return order;
  }

  remove(id: string) {
    const orderIndex = this.orders.findIndex((x) => x.id == id);

    if (orderIndex < 0) return;

    this.orders.splice(orderIndex, 1);
  }

  orders: Order[] = [
    {
      id: '37c02561-b18a-491e-ad34-d8f153c60496',
      shopperId: '1623c77c-2910-49f0-98e2-da151f7aab3f',
      quantity: 3,
      totalPrice: 12.47,
    },
    {
      id: 'e7447e61-1c37-4015-afbb-8677808c1ca0',
      shopperId: '23378b1f-d2ee-4896-835d-298a042cf300',
      quantity: 23,
      totalPrice: 2.17,
    },
    {
      id: '202c83af-d603-4064-9327-8617485269da',
      shopperId: 'fae93601-7fe4-489f-a4af-55cffe9ca6ae',
      quantity: 1,
      totalPrice: 22.25,
    },
  ];
}
