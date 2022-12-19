import fs from 'fs'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const apolloClient = new ApolloClient({
    uri: 'http://joneco.dev.br:1337/graphql',
    cache: new InMemoryCache(),
  });


const systemsByGenerationQuery  = gql`
query{
      systemsConnection{
        groupBy{
          generation{
            key
            connection{
              values{
                name
                slug
                developer
                generation
              }
              aggregate{
                count
              }
            }
          }
        }
      }
    }
`


const {data,loading} = useQuery(systemsByGenerationQuery);

console.log(data,loading)

const dataToSave = JSON.stringify(data);
fs.writeFileSync('../systems.json', dataToSave);