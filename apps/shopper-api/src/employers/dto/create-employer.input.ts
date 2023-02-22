import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateEmployerInput {
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
    description: 'Number of years the company has been in business.',
  })
  yearsInBusiness?: number;

  @Field(() => ID, {
    nullable: true,
    description: 'Headquarters address identifier',
  })
  headquarterAddressId?: string;
}
