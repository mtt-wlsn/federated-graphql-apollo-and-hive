import { Product } from './../../products/entities/product.entity';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => [Product])
  products?: Product[];
}
