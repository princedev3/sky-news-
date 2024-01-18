 import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

 export const GET = async(req:NextApiRequest)=>{
  try {
    const catogories = await prisma.category.findMany()
    return new NextResponse(JSON.stringify(catogories),{status:200})

  } catch (error) {
    return new NextResponse(JSON.stringify({error:"can not fetch all categories"}),{status:500})
  }
 }