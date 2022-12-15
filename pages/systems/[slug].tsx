import type { GetStaticPaths,GetStaticProps } from "next";

import { PrismaClient,System } from "@prisma/client";
import Card from "../../src/components/card";
import Image from "next/image";
import Layout from "../../src/layout/Layout";
import Link from "next/link";
import { FamilyRestroom, Star, Undo } from "@mui/icons-material";
import { Alert } from "@mui/material";
import axios from "axios";

const prisma = new PrismaClient();

export type SystemPageProps=System;

export default function SystemPage({system,imageFile}){

    const {name,slug,id,generation,developer,release,description,logo,image,games,gamesRel} = system

    const path = `http://localhost:1337${imageFile.url}`
    
    

    return(
        <>
      <Link href ="/"><button><Undo/>Back</button></Link>

    <div className="system-info">
        <div className="system-data">
            <img src={path} width={500} ></img>
          {/* <Image
                src={path}
                alt='Game System'
                width={200}
                height={300}
            /> */}
        {/* <img className="system-image" src={`http://localhost:8000/static/ff1dcc92da5449ee129575d364b5dd97/f53ee/system.webp`}></img> */}
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
      {/* <div className="system-review" dangerouslySetInnerHTML={{__html:systemInfo.html}}></div> */}

<hr></hr>
<h1>{developer} {name}</h1>

      <div className="cards">
        
        {
         !games || games.length<1 
         ?
         <Alert severity="error"> No Games for this System in the Database!</Alert>
         :
         gamesRel.map((game:any,index:number)=>{
            // const gameProps = {...game, type:'Game'};
            game.type = 'Game';
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
              justify-content:space-evenly;
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
export const getStaticPaths:GetStaticPaths<SystemQuery> = async ()=>{
    
const systemSlugs = await prisma.system.findMany({
    select:{
        slug:true,
    }
})


// paths é um array,
return{
    paths: systemSlugs.map((system)=>({
        params:{ slug: system.slug }
    })),

    fallback:false, // fallback false vai pra uma pasta de error 404 se o id nao existir
}
}

// puxa as infos para jogar nas props da pagina
export const getStaticProps:GetStaticProps<SystemPageProps,SystemQuery> = async({params})=>{
    
    const system = await prisma.system.findFirst({
        where:{
            slug: params?.slug
    },
    include:{
        gamesRel:{
            include:{
                imageRel:true
            }
        }
        }
    }) as System


    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTU1OTczZWYwMzAyNGM0M2I2ZDQxZCIsImlhdCI6MTY3MDczMjM0OCwiZXhwIjoxNjczMzI0MzQ4fQ.eOBGPosG3fOTwwxNa2DRHWbmI7yaK2o_V8s4Lb_Amtk';

const config = {
  headers:{
    Authorization: `bearer ${token}`
  }
}

  const response = await axios.get(`http://127.0.0.1:1337/upload/files/${system.image}`,config)
  const imageFile = response.data;


    return {
        props:{system,imageFile}
    }
}
