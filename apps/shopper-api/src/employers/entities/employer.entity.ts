import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Address } from '../../addresses/entities/address.entity';

@ObjectType()
export class Employer {
  @Field(() => ID, { description: 'Employer Identifier' })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Legal Name',
  })
  legalName?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Doing Business As (DBA) Name',
  })
  dbaName?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of years the company has been in business',
  })
  yearsInBusiness?: number;

  @Field(() => ID, {
    nullable: true,
    description: 'Headquarters address identifier',
  })
  headquarterAddressId?: string;

  @Field(() => Address, {
    nullable: true,
    description: 'Headquarters address',
  })
  headquarterAddress?: Address;
}
