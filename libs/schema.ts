
import { gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import isAdmin from '@/libs/isAdmin';

// Definir esquema de GraphQL
export const typeDefs = gql`
  type Movement {
    id: ID!
    type: String!
    amount: Float!
    date: String!
    user: User!
  }

  type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  phoneNumber: String!
  }

  type Query {
    movements: [Movement]
    users: [User]
  }

  type Mutation {
    addMovement(type: String!, amount: Float!, date: String!): Movement
    editUser(id: ID!, name: String, role: String): User
  }
`;
const prisma = new PrismaClient();

// Resolvers (temporalmente vacíos)
export const resolvers = {
  Query: {
    movements: async () => await prisma.movement.findMany(),
    users: isAdmin(async () => await prisma.user.findMany()),
  },
  Mutation: {
    addMovement: async (args: { type: string, amount: number, date: Date }) => {
      const { type, amount, date } = args;
      return await prisma.movement.create({
        data: { type, amount, date: new Date(date), userId: 1 },
      });
    },
    editUser: async (_: unknown, args: { id: string | number, name: string, role: string }) => {
      console.log("ARgs on schema....", args)
      const { id, name, role } = args;
      return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, role },
      });
    },
  },
};
