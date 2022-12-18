import type { GetStaticPaths,GetStaticProps } from "next";

import Card from "../../src/components/card";
import Image from "next/image";
import Layout from "../../src/layout/Layout";
import Link from "next/link";
import { Cancel, CheckCircle, FamilyRestroom, SportsEsports, Star, Undo } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { apolloClient, gql } from "../../src/apolloClient";
import YouTube from "react-youtube";
import { Game } from "@prisma/client";


export type GamePageProps={
  
};

export default function GamePage({game}:{game:any}){
    const {name,slug,id,developer,release,description,logo,image,systems,players,categories,online,videoId,screenshots} = game
    const descriptionFirstLetter=(description as String).substring(0,1)
    const restDescription = (description as String).substring(1,(description as String).length)
    const aspectRatio = logo.width/logo.height;
    
    return(
      <>
      {logo?
        <div className="game-logo"><Image src={`http://joneco.dev.br:1337${logo.url}`} width={750} height={750/aspectRatio} alt={game.name}></Image></div>
      :<h1>{name}</h1>
    }
        <div className="technical">
          <Image src={`http://joneco.dev.br:1337${image.url}`} width={300} height={340} alt={game.name}></Image>
          <div className="text">
          <p>Release Date: {release}</p>
          <p>Publisher: {developer}</p>
          <p>Platforms: GameCube, Dreamcast</p>
          <p>Categories: 
            {
              categories.map((category:any)=>{
                return (category.name+ ` `)
              })
            }

          </p>
          <p>Players: {Array.from({length:players},()=>{
                    return <SportsEsports fontSize="large"/>
                  })}</p>
          <p>Online: {online ? <CheckCircle fontSize="large"/> : <Cancel fontSize="large"/>}</p>
          <p>Rate: 5</p>
  
          </div>
          </div>
          <div className="review">
          
          <div className="post-content">
          <h3>Sinopse</h3>
          {/* por substring e tirar o 0, por no drop-cap e deixar o resto */}
          {/* span className="drop-cap">C</span> */}
            <p><span className="drop-cap">{descriptionFirstLetter}</span>{restDescription}</p>
  <h3>Gameplay</h3>

  {videoId?
  <YouTube videoId={`${videoId}`}></YouTube>
  :
  <Alert severity="error"> No Video for this Game in the Database!</Alert>
}

  
  <h3>Screenshots</h3>

  {screenshots?
  <div className="game-screenshots">
    {
      screenshots.map((screenshot:any,index:number)=>{
        return(
          <a href={`http://joneco.dev.br:1337${screenshot.url}`} target='_blank'>
          <Image
            key={index}
            id={`screenshot-${index}`}
            alt={`Screenshot ${index}`}
            src={`http://joneco.dev.br:1337${screenshot.formats.thumbnail.url}`} 
            width={screenshot.formats.thumbnail.width} 
            height={screenshot.formats.thumbnail.height}
          />
           </a>
        )
      }
      )
    }
  </div>
  :
  <Alert severity="error"> No Screenshots for this Game in the Database!</Alert>
}

  
          </div>
          
  
  
        </div>
      <style jsx>
          {`

      
      .game-logo{
        text-align:center;
        img{max-width:720px;}
      }

      .game-screenshots>*:not(:first-child){
        margin-left:10px;
       }
      .drop-cap {
          position: relative;
          display: block;
          float: left;
          line-height: 1;
          font-family: Georgia,serif !important;
          font-weight: 400 !important;
          font-size: 60px !important;
          font-family: Georgia,serif;
          font-weight: 700;
          margin-right: 5px;
      }
  
        .post-content {
          column-count: 2;
          column-gap: 50px;
          column-rule-color: rgba(40, 40, 50, 1);
          column-rule-width: 1px;
          column-rule-style: solid;
          /* text-indent: 10px; */
      }

      
  
      .post-content > p :nth-child(n+3){
        text-indent: 20px;
      }
  
          h1{
            text-align:center;
            justify-content:center;
          }
  
          h3 {
          color: rgba(255, 255, 255, 1);
          text-transform: uppercase;
          background: rgba(81, 98, 213, 1);
          padding: 6px;
          padding-right: 10px;
          padding-left: 10px;
          margin-bottom: 15px;
          display: inline-block;
            }

          h3:not(:first-child) {
              margin-top: 20px;
          }
          p{
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
  games {
    slug
  }
}
  `
});

const gamesSlugs= result.data.games

// paths é um array,

  return{
      paths: gamesSlugs.map((game:any)=>({
          params:{ slug: game.slug }
      })),

      fallback:false, // fallback false vai pra uma pasta de error 404 se o id nao existir
  }
}

// puxa as infos para jogar nas props da pagina
export const getStaticProps:GetStaticProps<GamePageProps,SystemQuery> = async({params})=>{
      const result = await apolloClient.query({
      query:gql`
        query {
      games(where:{slug:"${params?.slug}"}){
        __typename
        name
        release
        slug
        developer
        players
        online
        description
        videoId
        screenshots{
          name
          url
          width
          size
          height
          formats
        }
        systems{
          name
          slug
        }
        image{
          name
          url
          width
          size
          height
          formats
            }
        logo{
          name
          url
          width
          size
          height
          formats
            }
        categories{
          name
          short_name
        }
  }
    }
      `
    })



    const game = result.data.games[0]
   
    return {
        props:{game}
    }
}