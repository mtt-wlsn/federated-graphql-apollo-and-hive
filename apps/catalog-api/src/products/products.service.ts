import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  create(createProductInput: CreateProductInput) {
    const product: Product = {
      id: crypto.randomUUID(),
      orderId: createProductInput.orderId,
      name: createProductInput.name,
      description: createProductInput.description,
    };

    this.products.push(product);

    return product;
  }

  findOne(id: string) {
    console.log(`ProductsService.findOne ${id}`);
    return this.products.find((x) => x.id == id);
  }

  findAll() {
    console.log(`ProductsService.findAll`);
    return this.products;
  }

  findManyByOrderId(orderId: string) {
    console.log(`ProductsService.findManyByOrderId ${orderId}`);
    return this.products.filter((x) => x.orderId == orderId);
  }

  findManyByManyOrderIds(orderIds: string[]) {
    console.log(`ProductsService.findManyByManyOrderIds ${orderIds}`);
    return this.products.filter((x) => orderIds.includes(x.orderId));
  }

  findManyByOrderIdsBatch(orderIds: string[]): (Product[] | any)[] {
    const products = this.findManyByManyOrderIds(orderIds);
    // DataLoader requires the mappedProducts to be in the same order as the
    // input orderIds.
    return orderIds.map(
      (orderId) =>
        products.filter((product) => product.orderId === orderId) || null,
    );
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    const product = this.products.find((x) => x.id == id);

    if (!product) return;

    product.name = updateProductInput.name ?? product.name;
    product.description = updateProductInput.description ?? product.description;

    return product;
  }

  remove(id: string) {
    const productIndex = this.products.findIndex((x) => x.id == id);

    if (productIndex < 0) return;

    this.products.splice(productIndex, 1);
  }

  products: Product[] = [
    {
      id: '608e70d5-78e9-46eb-8efd-1268e5e0dedb',
      orderId: '37c02561-b18a-491e-ad34-d8f153c60496',
      name: 'Product 1',
      description: 'Product 1 description',
    },
    {
      id: '77f5df51-439f-4195-9eb5-9a2fe53dcd2f',
      orderId: '37c02561-b18a-491e-ad34-d8f153c60496',
      name: 'Product 2',
      description: 'Product 2 description',
    },
    {
      id: '996c90e7-698d-4835-843a-06712665303a',
      orderId: '37c02561-b18a-491e-ad34-d8f153c60496',
      name: 'Product 3',
      description: 'Product 3 description',
    },
    {
      id: '608e70d5-78e9-46eb-8efd-1268e5e0dedb',
      orderId: 'e7447e61-1c37-4015-afbb-8677808c1ca0',
      name: 'Product 1',
      description: 'Product 1 description',
    },
    {
      id: '77f5df51-439f-4195-9eb5-9a2fe53dcd2f',
      orderId: 'e7447e61-1c37-4015-afbb-8677808c1ca0',
      name: 'Product 2',
      description: 'Product 2 description',
    },
    {
      id: '996c90e7-698d-4835-843a-06712665303a',
      orderId: 'e7447e61-1c37-4015-afbb-8677808c1ca0',
      name: 'Product 3',
      description: 'Product 3 description',
    },
    {
      id: '608e70d5-78e9-46eb-8efd-1268e5e0dedb',
      orderId: '202c83af-d603-4064-9327-8617485269da',
      name: 'Product 1',
      description: 'Product 1 description',
    },
    {
      id: '77f5df51-439f-4195-9eb5-9a2fe53dcd2f',
      orderId: '202c83af-d603-4064-9327-8617485269da',
      name: 'Product 2',
      description: 'Product 2 description',
    },
  ];
}
