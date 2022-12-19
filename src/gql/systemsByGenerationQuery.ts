import { gql } from "@apollo/client";

export const systemsByGenerationQuery  = gql`
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
