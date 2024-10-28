import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import ApolloProvider from '@/libs/ApolloProvider';

import Navbar from '@/components/NavBar';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider>
      <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
