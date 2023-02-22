import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'orders',
              url: `http://localhost:${process.env.ORDER_API_PORT}/graphql`,
            },
            {
              name: 'catalogs',
              url: `http://localhost:${process.env.CATALOG_API_PORT}/graphql`,
            },
            {
              name: 'shoppers',
              url: `http://localhost:${process.env.SHOPPER_API_PORT}/graphql`,
            },
          ],
        }),
      },
    }),
  ],
})
export class GatewayApiModule {}
