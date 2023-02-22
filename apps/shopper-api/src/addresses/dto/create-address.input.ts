import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => ID, { description: 'Shopper identifier' })
  shopperId: string;

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
