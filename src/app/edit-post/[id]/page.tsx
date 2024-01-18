import { getAuthSession } from '@/app/api/auth/[...nextauth]/route'
import EditPostForm from '@/components/EditPostForm'
import React from 'react'
import { redirect } from 'next/navigation'
import { Postprops } from '@/lib/type'

const getPost = async (id:string):Promise<Postprops|null|undefined>=>{
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`,{
    cache:"no-store"
  })
  if(res.ok){
    return await res.json()
  }
}

const EditPost =async ({params}:{params:{id:string}}) => {

    const {id} =  params

   const session = await getAuthSession() 
   if(!session){
     redirect("/sign-in")
   }

   const post = await getPost(id)
  
  return (
    <>
      {
        post?   <EditPostForm post={post} />: <div>Invalid Post</div>
      }
    </>
  )
}

export default EditPost