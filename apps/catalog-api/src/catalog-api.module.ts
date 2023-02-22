import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { writeFileSync } from 'fs';
import { printSubgraphSchema } from '@apollo/subgraph';
import { Order } from './orders/entities/order.entity';
import { OrdersResolver } from './orders/orders.resolver';
import { ConfigModule } from '@nestjs/config';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: 'catalog-api-schema.gql',
      buildSchemaOptions: {
        orphanedTypes: [Order],
      },
      transformSchema: (schema) => {
        writeFileSync('catalog-api-schema.gql', printSubgraphSchema(schema));
        return schema;
      },
      driver: ApolloFederationDriver,
      debug: false, // Needs to be environment driven
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Needs to be environment driven
    }),
    ProductsModule,
    DataloaderModule,
  ],
  providers: [OrdersResolver],
})
export class CatalogApiModule {}
