import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: {
    async signIn({ user, account, profile }) {
      // Comprobar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // Asigna un rol por defecto al nuevo usuario
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            role: 'user', // Cambia 'user' por el rol que desees
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }, // Solo selecciona el rol
      });
      session.user.role = dbUser?.role; // Asegúrate de que el rol del usuario esté en la sesión
      return session;
    },
  },
};

export default NextAuth(authOptions);
