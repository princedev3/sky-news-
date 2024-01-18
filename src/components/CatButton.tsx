"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const CatButton = () => {
    const router = useRouter()
  return (
    <button className='px-2 ml-4 tracking-widest py-1 rounded-md bg-slate-900 border-none text-white' onClick={()=>router.back()}>back</button>
   
  )
}

export default CatButton