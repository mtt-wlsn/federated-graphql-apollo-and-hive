import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID, { description: 'Identifier' })
  id: string;

  @Field(() => ID, {
    nullable: true,
    description: 'Id of the Shopper placing the order.',
  })
  shopperId?: string;

  @Field(() => Float, {
    nullable: true,
    description: 'The amount of products being purchased.',
  })
  quantity?: number;

  @Field(() => Float, {
    nullable: true,
    description: 'The total amount the shopper will be charged for the order.',
  })
  totalPrice?: number;
}
