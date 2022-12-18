import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout/Layout'
import Message from './_message'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Message/>
      <Component {...pageProps} />
      <style jsx global>{`


        `}</style>
    </Layout>

  )
  
}


