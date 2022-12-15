import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, User,System } from "@prisma/client";
const prisma = new PrismaClient

export default async function systems(req:NextApiRequest,res:NextApiResponse){
//    const categories = await prisma.category.findMany();
//     res.status(200).json(categories);

}