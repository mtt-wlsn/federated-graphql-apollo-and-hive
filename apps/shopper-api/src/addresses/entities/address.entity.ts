import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field(() => ID, { description: 'Address identifier' })
  id: string;

  @Field(() => ID, { nullable: true, description: 'Shopper identifier' })
  shopperId?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Address Line 1',
  })
  addressLine1?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Address Line 2',
  })
  addressLine2?: string;

  @Field(() => String, {
    nullable: true,
    description: 'City',
  })
  city?: string;

  @Field(() => String, {
    nullable: true,
    description: 'State',
  })
  state?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Postal Code',
  })
  postalCode?: string;
}
