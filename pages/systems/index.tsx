import * as React from "react"
import Card from "../../src/components/card"
import { cardParams } from "../../src/components/card"
import type { GetStaticPaths,GetStaticProps } from "next";
import { apolloClient, gql } from "../../src/apolloClient";
import MetaTags from "../../src/components/meta-tags";


export type SystemInfoProps={
  name:string;
  image:string;
  slug:string;
  developer:string;
  generation:string;
  rate:string;
  type:string;
  totalCount?:number;

}
export type SystemsProps={
  systems:any,
  counters:any,
}

const Systems = ({systems}:SystemsProps) => {

  
  return (
    <article>
      <MetaTags title={'Sistemas'} description={'List of videogame system by generation.'}/>
      <h1>Systems</h1>
      <div className="cards">
        {systems.map((item:any,index:number)=>{
          let system:cardParams = item
          system = {...item,...item.fields}
          system.type = 'System';
          return <Card key={index} cardParams={system}></Card>
        })}
      </div>
    <style jsx>
        {`
          .cards{
            display:flex;
            flex-direction:row;
            justify-content:space-around;
            flex-wrap:wrap;
            flex-grow: 0; flex-shrink: 0; flex-basis: 50%;
            
          }
          
        `}
    </style>
</article>
    
  )

}

export type SystemProps={
  systems:Array<any>
}

export const getStaticProps:GetStaticProps<SystemProps> = async()=>{
   
  const result = await apolloClient.query({
    query:gql`
   query{
    systems {
      name
      slug
      generation
      image{
        name
        url
      }
    }
  }
    `
  });
  
      return {
          props:{
            systems:result.data.systems
          }
      }
  }
  

export default Systems


