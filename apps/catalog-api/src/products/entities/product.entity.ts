import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID, { description: 'Identifier' })
  id: string;

  @Field(() => ID, { description: 'Order identifier' })
  orderId: string;

  @Field(() => String, {
    nullable: true,
    description: 'Name',
  })
  name?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description',
  })
  description?: string;
}
