// lib/ApolloProvider.tsx
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <Provider client={client}>{children}</Provider>
);

export default ApolloProvider;
