// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  img: string,
  slug:string,
  developer:string,
  generation:number,
  rate:number,
  type:String
}

let systems:Data[] = [
  {name:'Super Nintendo',img:'',slug:'nintendo-snes',developer:'Nintendo',generation:4,rate:5,type:'System'},
  {name:'Mega Drive',img:'',slug:'sega-megadrive',developer:'sega',generation:4,rate:5,type:'System'},
]


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(systems)
}
