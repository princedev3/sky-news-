import SigninBtns from '@/components/SigninBtns'
import React from 'react'
import { getAuthSession } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const SignIn =async () => {
  const session =await getAuthSession()
  
    if(session){
        redirect("/dashboard")
    }
  return (
    <div>
        <SigninBtns/>
    </div>
  )
}

export default SignIn