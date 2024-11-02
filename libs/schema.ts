
import { gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import isAdmin from '@/libs/isAdmin';
import { EDIT_MOVEMENT } from '@/graphql/mutations/editMovement';

// Definir esquema de GraphQL
export const typeDefs = gql`
  type Movement {
    id: ID!
    type: String!
    concept: String!
    amount: Float!
    date: String!
    userId: ID!     
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
    addMovement(type: String!, amount: Float!, date: String!, userId: Float!, concept: String!): Movement
    editMovement(id: ID!, concept: String!, type: String!, amount: Float!, date: String!): Movement 
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
  Movement: {
    user: async (parent) => {
      return await prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
  Mutation: {
    addMovement: async (_: unknown, args: { type: string, amount: number, date: Date, userId: number, concept: string }) => {
      const { type, amount, date, userId, concept } = args;
      return await prisma.movement.create({
        data: { type, amount, date: new Date(date), userId, concept },
      });
    },
    editMovement: async (_: unknown, args: { id: string | number, concept: string, type: string, amount: number, date: string }) => {
      const { id, concept, type, amount, date } = args
      return await prisma.movement.update({
        where: { id: Number(id) },
        data: { concept, type, amount, date }
      })
    },
    editUser: async (_: unknown, args: { id: string | number, name: string, role: string }) => {
      const { id, name, role } = args;
      return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, role },
      });
    },
  },
};
