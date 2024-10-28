import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs, resolvers } from '@/libs/schema';

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
