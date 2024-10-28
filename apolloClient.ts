import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql', // URI de la API GraphQL
  cache: new InMemoryCache(),
});

export default client;
