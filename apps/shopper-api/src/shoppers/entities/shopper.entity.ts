import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Address } from '../../addresses/entities/address.entity';
import { Employer } from '../../employers/entities/employer.entity';

@ObjectType()
export class Shopper {
  @Field(() => ID, { description: 'Shopper identifier' })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'First Name',
  })
  firstName?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Last Name',
  })
  lastName?: string;

  @Field(() => Date, {
    nullable: true,
    description: 'Date of Birth',
  })
  dateOfBirth?: Date;

  @Field(() => [Address], {
    nullable: true,
    description: 'Associated Addresses',
  })
  associatedAddresses?: Address[];

  @Field(() => ID, {
    nullable: true,
    description: 'Shoppers employer identifier',
  })
  employerId?: string;

  @Field(() => Employer, {
    nullable: true,
    description: 'Shoppers employer',
  })
  employer?: Employer;
}
