import prisma from "@/lib/prismadb"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


const authOptions:AuthOptions ={
  adapter:PrismaAdapter(prisma) as any,
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
          }),
    ],
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/sign-in"
    }
}


const handler = NextAuth(authOptions)

export {handler as GET,handler as POST}



export const getAuthSession = ()=>getServerSession(authOptions)