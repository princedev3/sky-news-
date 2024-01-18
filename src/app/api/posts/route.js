import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"
import { Postprops } from "@/lib/type"
import { DateTime } from "next-auth/providers/kakao";
import { getAuthSession } from "../auth/[...nextauth]/route";


// interface dataprops {

//         title: string;
//         content: string;
//         links: string[];
//         imageUrl: string;
//         publicId:string;
//         catName: string;
//         selectedCategory:string,
//         updatedAt:DateTime,
//         createdAt:DateTime,
//         authorEmail: string ;
    
// }

export const POST = async(req)=>{
    const session = await  getAuthSession()
         
    if(!session){
        return new NextResponse(JSON.stringify({error:"not authenticated"},{status:401}))
    }
    const {title,content,links,imageUrl,publicId, selectedCategory}= await req.json()
   if(!title || ! content){
    return new NextResponse(JSON.stringify({error:"Title and content are request"}))
   }
   
    try {
        const newPost = await prisma.post.create({
            data:{
                title,content,links,imageUrl,catName:selectedCategory,authorEmail:session.user.email
            }
        })
        return  new NextResponse(JSON.stringify(newPost),{status:200})
    } catch (error) {
        console.log(error)
        return  new NextResponse(JSON.stringify({error:"can not  create post"}),{status:500})
        
    }
} 

export const GET = async()=>{
    try {
        const posts = await prisma.post.findMany({
            include:{author:{select:{name:true}}},
            orderBy:{
                createdAt:"desc"
            }
        })
        return new NextResponse(JSON.stringify(posts,{status:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({error:"can not get all post"},{status:500}))
    }
}
