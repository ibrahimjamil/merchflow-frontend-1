import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Head>
            <title>Merchflow</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, user-scalable=0"
            />
          </Head>
          {typeof window === 'undefined' ? null : <Component {...pageProps} router={router} />}
      </QueryClientProvider>
    </div>
  )
}

export default MyApp
