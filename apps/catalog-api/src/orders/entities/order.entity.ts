import { Product } from './../../products/entities/product.entity';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Product])
  products?: Product[];
}
