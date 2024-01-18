import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { getAuthSession } from "../../auth/[...nextauth]/route"


export const GET = async(req,{params})=>{
    const {id}= await params
   
    try {
        const post  = await prisma.post.findUnique({where:{id}})
        return new NextResponse(JSON.stringify(post,{status:500}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({error:"can not get single post"},{status:500}))
    }
}

export const PUT = async (req,{params})=>{
    const session = await  getAuthSession()

    if(!session){
        return new NextResponse(JSON.stringify({error:"not authenticated"},{status:401}))
    }
    const {id}= await params
    const {title,content,links,imageUrl,publicId, selectedCategory}= await req.json()
    try {
        const editPost = await prisma.post.update({where:{id},
            data:{
                title,content,links,imageUrl,publicId,catName:selectedCategory
            }})
        return new NextResponse(JSON.stringify(editPost,{status:200}))

    } catch (error) {
        return new NextResponse(JSON.stringify({error:"can not update single post"},{status:500}))
    }
}

export const DELETE= async(req,{params})=>{
    const session = await  getAuthSession()

    if(!session){
        return new NextResponse(JSON.stringify({error:"not authenticated"},{status:401}))
    }
    const {id}= await params
    try {
        const deletedPost = await prisma.post.delete({where:{id}})
        return new NextResponse(JSON.stringify(deletedPost,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({error:"can not delete single post"},{status:500}))
    }
}
