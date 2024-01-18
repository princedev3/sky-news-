import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const GET = async(req,{params})=>{
    const {catName}= await params
    try {
        const catPost = await prisma.category.findUnique({
            where: {catName},
            include:{posts:{include:{author:true},orderBy:{createdAt:"desc"}}},
            
        })
        return new NextResponse(JSON.stringify(catPost,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({error:"can not get single post category"},{status:500}))
    }
}