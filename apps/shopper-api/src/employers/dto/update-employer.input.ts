import { CreateEmployerInput } from './create-employer.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployerInput extends PartialType(CreateEmployerInput) {
  @Field(() => ID)
  id: string;
}
