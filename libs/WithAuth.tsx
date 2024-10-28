/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component: React.FC<{ role?: string }>, role: string) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated' && session?.user?.role !== role) {
        router.replace('/');
      }
    }, [status, session, router]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated' || session?.user?.role !== role) {
      return <p>No tienes permiso para acceder a esta página.</p>;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
