import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient,System } from "@prisma/client";
const prisma = new PrismaClient

export default async function systems(req:NextApiRequest,res:NextApiResponse){
    const systems = await prisma.system.findMany();
    res.status(200).json(systems);

}