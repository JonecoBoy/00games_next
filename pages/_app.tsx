import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout/Layout'
import Message from './_message'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../src/apolloClient'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Message/>
        <Component {...pageProps} />
        <style jsx global>{`


          `}</style>
      </Layout>
    </ApolloProvider>
    </SessionProvider>
  )
  
}


