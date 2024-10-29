import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import ApolloProvider from '@/libs/ApolloProvider';

import '../styles/globals.css';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
