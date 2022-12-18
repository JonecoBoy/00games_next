import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
export {gql} from '@apollo/client'

export const apolloClient = new ApolloClient({
    uri: 'http://joneco.dev.br:1337/graphql',
    cache: new InMemoryCache(),
  });