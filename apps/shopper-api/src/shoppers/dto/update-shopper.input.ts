import { CreateShopperInput } from './create-shopper.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShopperInput extends PartialType(CreateShopperInput) {
  @Field(() => ID, { description: 'Shopper identifier' })
  id: string;
}
