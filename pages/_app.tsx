import "../styles/globals.css"
import { AppProps } from "next/app"
import { Provider } from 'next-auth/client';

export default function FEEmporioLambda({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <Provider options={{ site: process.env.NEXT_PUBLIC_SITE }} session={session}>
      <Component {...pageProps} />
    </Provider>
  );
};