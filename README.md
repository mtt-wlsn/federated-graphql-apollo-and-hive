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

# Running Subgraphs using Kubernetes

First you will need to build the docker image. There is one image containing all subgraphs.

```bash
docker build -t federated-graphql-apollo-and-hive .
```

Deploy each subgraph using helm by running the following script, once again replacing `{subgraph-name}` with one of the name options listed above.

```bash
helm upgrade --install {subgraph-name} ./helm/charts/subgraph --create-namespace --namespace federated-graphql-apollo-and-hive-demo --values ./helm/{subgraph-name}-values.yaml

# or, if you would like to view the generated manifest files first, run this command
helm install --debug --dry-run {subgraph-name} ./helm/charts/subgraph --create-namespace --namespace federated-graphql-apollo-and-hive-demo --values ./helm/{subgraph-name}-values.yaml

```
