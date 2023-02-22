import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Shopper } from '../../shoppers/entities/shopper.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Order {
  @Field(() => ID, { description: 'Identifier' })
  id: string;

  @Field(() => ID, { nullable: true })
  @Directive('@external')
  shopperId?: string;

  @Field(() => Shopper, { nullable: true })
  @Directive('@requires(fields: "shopperId")')
  shopper?: Shopper;
}
