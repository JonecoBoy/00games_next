import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout/Layout'
import Message from './_message'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../src/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Message/>
        <Component {...pageProps} />
        <style jsx global>{`


          `}</style>
      </Layout>
    </ApolloProvider>
  )
  
}


