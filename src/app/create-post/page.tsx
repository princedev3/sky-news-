import CreatePostForm from '@/components/CreatePostForm'
import React from 'react'
import { getAuthSession } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const CreatePost = async() => {
    const session =await getAuthSession()
    if(!session){
        redirect("/sign-in")
    }
  return (
    <div>
        <CreatePostForm/>
    </div>
  )
}

export default CreatePost