import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { typeDefs, resolvers } from '@/libs/schema';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    // Usa getServerSession para obtener la sesión en el servidor
    const session = await getServerSession(req, res, authOptions);
    return  session ;
  },
});

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
