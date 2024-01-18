"use client"
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'


const SigninBtns = () => {
  return (
    <div>
        <h1  className='text-center mt-8 '>Sign In</h1>
        <div className='mt-4 p-4 flex flex-col items-center justify-center gap-4'>
            <button className='flex items-start border p-4 rounded-full hover:bg-slate-100/20 transition gap-4'>
                <span>
                    <Image src={"/github-logo.svg"} width={30} height={30} alt=''/>
                </span>
                Sign in with github
            </button>
            <button onClick={()=>signIn("google")} className='flex items-start border p-4 rounded-full hover:bg-slate-100/20 transition gap-4'>
                <span>
                    <Image src={"/google-logo.svg"} width={30} height={30} alt=''/>
                </span>
                Sign in with google
            </button>
        </div>
    </div>
  )
}

export default SigninBtns
