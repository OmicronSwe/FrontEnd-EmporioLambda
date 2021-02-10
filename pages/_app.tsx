import "../styles/globals.css"
import { AppProps } from "next/app"

export default function FEEmporioLambda({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
