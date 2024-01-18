import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export const GET = async(req,{params})=>{
    const {email} = await params
    try {
        const userPost = await prisma.user.findUnique({
            where:{email},
            include:{posts:{orderBy:{createdAt:"desc"}}}
        })
        return new NextResponse(JSON.stringify(userPost,{status:500}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({error:"can not get posts by users"},{status:500}))
    }
}