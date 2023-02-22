import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
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
