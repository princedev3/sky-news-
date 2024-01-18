"use client"

import { SessionProvider } from "next-auth/react"


export  const  NextAuthProvider = async({children}:{children:React.ReactNode})=>{

    return <SessionProvider>{children} </SessionProvider>
}