import type { GetStaticPaths,GetStaticProps } from "next";

import Card from "../../src/components/card";
import Image from "next/image";
import Layout from "../../src/layout/Layout";
import Link from "next/link";
import { FamilyRestroom, Star, Undo } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { apolloClient, gql } from "../../src/apolloClient";


export type SystemPageProps=System;

export default function SystemPage({system,games}:{system:any,games:Array<any>}){
    const {name,slug,id,generation,developer,release,description,logo,image} = system

    return(
        <>
      <Link href ="/"><button><Undo/>Back</button></Link>

    <div className="system-info">
        <div className="system-data">
            <Image src={`http://joneco.dev.br:1337${image.url}`} width={350} height={250} alt={name}></Image>
            <table className="system-table">
              <tbody>
              <tr>
                <th>Publisher: </th>
                <td>{developer}</td>
              </tr>
              <tr>
              <th>Release Date: </th>
                <td>{release}</td>
              </tr>
              <tr>
              <th>Generation: </th>
                <td>{generation}</td>
              </tr>
              <tr>
              <th>Rate: </th>
                <td>
                  {/* {Array.from({length:Math.floor(system.rate)},()=>{
                    return <Star/>
                  })}
                  { system.rate % Math.floor(system.rate)? <StarHalf/>:null}
                  {Array.from({length:totalStars - (Math.ceil(system.rate)) },()=>{
                                      return <StarOutline/>
                                    })} */}
                </td>
              </tr>
              </tbody>
          </table>
      </div>
    </div>
    <h1 className="system-name">{developer} {name}</h1>


    {logo?
      <div className="system-logo"><Image src={`http://joneco.dev.br:1337${logo.url}`} width={logo.width} height={logo.height} alt={name}></Image></div>
      : null
    }    
    
<hr></hr>
      <div className="system-description">{description}</div>

      <div className="cards">
        
        {
         !games || games.length<1 
         ?
         <Alert severity="error"> No Games for this System in the Database!</Alert>
         :
         games.map((game:any,index:number)=>{
                    
          return(
                  <Card key={index} cardParams={game}/>
                )
        })
              
        }
        
      </div>
      
    <style jsx global>
        {`
          .cards{
            display:flex;
            flex-direction:row;
            justify-content:space-around;
            flex-wrap:wrap;
            margin-top:20px;
            
          }
          
          h1.system-name{
            text-align: center;
            font-size: 5.0rem;
            margin-bottom: 1.5rem;
          }
          .system-description{
            margin-top:1rem;
            font-size:1.5rem;
          }

          .system-logo{
            align-items: center;
            justify-items: center;
            text-align: center;
          }
          .system-review {
            column-count:2;
            columns: 20%, 2;
            column-gap: 50px;
            column-rule-color: rgba(40, 40, 50, 1);
            column-rule-width: 2px;
            column-rule-style: solid;
      
            margin-bottom: 2rem;
            /* text-indent: 10px; */
            
          }
          .system-info {
             text-align:center;
              
          }

          .system-info img{
     
            max-width: 100%;
              height: auto;
              margin:auto;
          }
          .system-data{
              flex:1;
              display:flex;
              justify-content:center;
              justify-items:center;
              max-width:75%;
              text-align:left;
              flex-direction:row;
              margin:20px 20px 20px 20px;
          }

          .info-box span{
            padding-top:200px;
          }
          hr{
            border: 1px solid  rgba(40, 40, 50, 1);
          }

          .system-review > h3{
            color: rgba(255, 255, 255, 1)!important;
            text-transform: uppercase;
            background-color: rgba(81, 98, 213, 1);
            padding: 6px;
            padding-right: 10px;
            padding-left: 10px;
            margin: 15px 0px 15px 0px;
            display: inline-block;
          }
          .system-review >p{
            margin-bottom:10px;
          }

          .text{
            margin-left:1em;
            vertical-align: middle;
            border: 4px solid #C4DBF6;
            align-self:center;
          }
          .technical p{
            font-size:2.5em;
            
          
          }

          .technical{
            
            display:flex;
            flex-direction:row;
            justify-content:center;
            flex-wrap:wrap;
            height:100%;
  
            border-bottom: 4px solid #C4DBF6;
            padding:20px;
            
          }

          .review{
            margin-top:1em;
            display:grid;
            flex-direction:row;
            justify-content:flex-start;
            flex-wrap:wrap;
            padding:20px;
            min-width:600px;;
            
          }
          span.title{
            font-size:2.05rem;
          }
          span:not(.title){
            font-size:1.4rem;
          }

          .system-table th{
            font-size:2.1em;
          }
          .system-table td{
            font-size:1.4em;
          }         
          
        `}
    </style>
</>
    )
}



type SystemQuery ={
    slug:string;
}


// roteamento dinamico
export const getStaticPaths = async ()=>{
    

const result = await apolloClient.query({
  query:gql`
 query{
  systems {
    slug
  }
}
  `
});

const systemSlugs= result.data.systems

// paths é um array,

  return{
      paths: systemSlugs.map((system:any)=>({
          params:{ slug: system.slug }
      })),

      fallback:false, // fallback false vai pra uma pasta de error 404 se o id nao existir
  }
}

// puxa as infos para jogar nas props da pagina
export const getStaticProps:GetStaticProps<SystemPageProps,SystemQuery> = async({params})=>{
  
    const result = await apolloClient.query({
      query:gql`
        query {
      systems(where:{slug:"${params?.slug}"}) {
        __typename
        name
        slug
        generation
        developer
        description
        release
        image{
          name
          url
        }
        logo{
          name
          url
          width
          height
        }
      }
      games(where:{systems:{slug:"${params?.slug}"}}){
        __typename
      name
      release
      slug
      developer
      systems{
        name
        slug
      }
      image{
      name
      url
    }
    logo{
          name
          url
        }
    categories{
      name
      short_name
    }
  }
    }
      `
    })




    const system = result.data.systems[0]
    const games = result.data.games

    return {
        props:{system,games}
    }
}

