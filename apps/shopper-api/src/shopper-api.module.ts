import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Module } from '@nestjs/common';
import { ShoppersModule } from './shoppers/shoppers.module';
import { AddressesModule } from './addresses/addresses.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { writeFileSync } from 'fs';
import { printSubgraphSchema } from '@apollo/subgraph';
import { Order } from './orders/entities/orders.entity';
import { OrdersResolver } from './orders/orders.resolver';
import { DataloaderModule } from './dataloader/dataloader.module';
import { EmployersModule } from './employers/employers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: {
        federation: 2,
        path: 'shopper-api-schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [Order],
      },
      transformSchema: (schema) => {
        writeFileSync('shopper-api-schema.gql', printSubgraphSchema(schema));
        return schema;
      },
      driver: ApolloFederationDriver,
      debug: false, // Needs to be environment driven
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Needs to be environment driven
    }),
    ShoppersModule,
    AddressesModule,
    DataloaderModule,
    EmployersModule,
  ],
  providers: [OrdersResolver],
})
export class ShopperApiModule {}
