import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shopper } from '../../shoppers/entities/shopper.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "shopperId")')
export class Order {
  @Field(() => ID, { nullable: true })
  @Directive('@external')
  shopperId?: string;

  @Field(() => Shopper, { nullable: true })
  shopper?: Shopper;
}
