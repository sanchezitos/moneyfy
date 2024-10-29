/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from 'apollo-server-micro';

const isAdmin = (resolver: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const session = context;
    if (session?.user?.role !== 'admin') {
      throw new ApolloError('Access denied. Administrators only.');
    }
    return resolver(parent, args, context, info);
  };
};

export default isAdmin;
