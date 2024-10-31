/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Role = 'admin' | 'user';

const withAuth = (Component: React.FC<{ role?: string }>, roles: Role | Role[]) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    useEffect(() => {
      if (status === 'authenticated' && !allowedRoles.includes(session?.user?.role)) {
        router.replace('/');
      }
    }, [status, session, router, allowedRoles]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated' || !allowedRoles.includes(session?.user?.role)) {
      return <p>No tienes permiso para acceder a esta página.</p>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
