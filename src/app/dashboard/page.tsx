import Post from '@/components/Post'

import Link from 'next/link'
import React from 'react'
import { getAuthSession } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Postprops } from '@/lib/type'

const getUSerPost = async(email:string)=>{
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`)
  if(res.ok){
    const {posts} = await res.json()
    return posts
  }
}

const Dashboard =async () => {
    const session =await getAuthSession()
    let postData =[]

    const email = session?.user?.email
    
    if(!session){
        redirect("/sign-in")
    }

    if(email){

       postData =  await getUSerPost(email)
    }

   
  return (
    <div>
        <h1>My Posts</h1>
        {
          postData && postData.length >0 ? postData.map((post:Postprops)=>
            <Post key={post.id} id={post.id} author={""} authorEmail={post.authorEmail}
             date={post.createdAt||''} thumbnail={post.imageUrl} category={post.category} title={post.title} content={post.content} links={post.links || []} />): <div className='py-6'>
                <p>No post created</p>
                <Link className='underline ml-2' href={"/create-post"}>Create New</Link>
             </div>
       }
    </div>
  )
}

export default Dashboard