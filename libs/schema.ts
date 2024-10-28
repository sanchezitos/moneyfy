import { gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';

// Definir esquema de GraphQL
export const typeDefs = gql`
  type Movimiento {
    id: ID!
    concepto: String!
    monto: Float!
    fecha: String!
    usuario: Usuario!
  }

  type Usuario {
    id: ID!
    nombre: String!
    correo: String!
    role: String!
  }

  type Query {
    movimientos: [Movimiento]
    usuarios: [Usuario]
  }

  type Mutation {
    agregarMovimiento(concepto: String!, monto: Float!, fecha: String!): Movimiento
    editarUsuario(id: ID!, nombre: String, rol: String): Usuario
  }
`;
const prisma = new PrismaClient();

// Resolvers (temporalmente vacíos)
export const resolvers = {
    Query: {
      movements: async () => await prisma.movement.findMany(),
      users: async () => await prisma.user.findMany(),
    },
    Mutation: {
      addMovement: async (_parent, args) => {
        const { type, amount, date } = args;
        return await prisma.movement.create({
          data: { type, amount, date: new Date(date), userId: 1 },
        });
      },
      editUser: async (_parent, args) => {
        const { id, name, role } = args;
        return await prisma.user.update({
          where: { id: Number(id) },
          data: { name, role },
        });
      },
    },
  };
