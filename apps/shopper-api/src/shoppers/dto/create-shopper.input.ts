import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateShopperInput {
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
}
