import * as React from "react"
import Card from "../../src/components/card"
import { cardParams } from "../../src/components/card"
import type {GetServerSideProps} from "next";
import axios from "axios";

export type SystemInfoProps={
  name:string;
  img:string;
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


// systems.forEach((system:SystemInfoProps)=>{
//   counters.forEach((counter:any)=>{
    
//     if(system.slug == counter.fieldValue){
      
//       system.totalCount=counter.totalCount ?? 0
//     }
//   })
  
// })
  
  return (
    <>
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
</>
    
  )

}

export const getServerSideProps:GetServerSideProps = async()=>{

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTU1OTczZWYwMzAyNGM0M2I2ZDQxZCIsImlhdCI6MTY3MDczMjM0OCwiZXhwIjoxNjczMzI0MzQ4fQ.eOBGPosG3fOTwwxNa2DRHWbmI7yaK2o_V8s4Lb_Amtk';

const config = {
  headers:{
    Authorization: `bearer ${token}`
  }
}

  const response = await axios.get('http://127.0.0.1:1337/Systems',config)
  const systems = response.data;

  // let systems = [
  //   {name:'Super Nintendo',img:'',slug:'nintendo-snes',developer:'Nintendo',generation:'4',rate:5,type:'System'},
  //   {name:'Mega Drive',img:'',slug:'sega-megadrive',developer:'sega',generation:'4',rate:5,type:'System'},
  // ]

  // const counters = [
  //   {fieldValue:'nintendo-snes',totalCount:10,},
  //   {fieldValue:'sega-megadrive',totalCount:5,},
  // ]





  return {
      props:{
        systems,
      }
  }
}

export default Systems


