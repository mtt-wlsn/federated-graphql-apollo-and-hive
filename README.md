# Running Subgraphs Locally

If you wish to run the subgraphs locally in debug mode run the following commands replacing `{subgraph-name}` with one of the following options:

- `order-api`
- `catalog-api`
- `shopper-api`

Commands:

```bash
# Install the dependencies
yarn install

# Build the project
yarn build:{subgraph-name}

# Start the API
yarn start:{subgraph-name}:debug
```
