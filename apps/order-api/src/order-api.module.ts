import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrdersModule } from './orders/orders.module';
import { writeFileSync } from 'fs';
import { printSubgraphSchema } from '@apollo/subgraph';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: 'order-api-schema.gql',
      transformSchema: (schema) => {
        writeFileSync('order-api-schema.gql', printSubgraphSchema(schema));
        return schema;
      },
      driver: ApolloFederationDriver,
      debug: false, // Needs to be environment driven
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Needs to be environment driven
    }),
    OrdersModule,
  ],
})
export class OrderApiModule {}
