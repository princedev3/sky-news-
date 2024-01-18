import CatButton from '@/components/CatButton'
import Post from '@/components/Post'
import { Postprops } from '@/lib/type'
import React from 'react'


const getPosts = async(catName:string):Promise<Postprops[] |null|undefined>=>{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`,{
        cache:"no-store"
    })

    if(res.ok){
        const {posts} = await res.json()
        return  posts
    }
}
     
const CategoryPage = async({params}:{params:{catName:string}}) => {
    const {catName} = params
   const posts= await getPosts(catName)
   
  
    
  return ( 
    <div>
        <h1>{decodeURIComponent(catName)}</h1>
        {
          posts && posts.length >0 ? posts.map((post:Postprops)=>
            <Post key={post.id} id={post.id} author={post.author.name} authorEmail={post.authorEmail}
             date={post.createdAt||''} thumbnail={post.imageUrl} category={post.category} title={post.title} content={post.content} links={post.links || []} />):  <p className='py-6'>No post to display
                <CatButton/>
             </p>
           
             
       }
        
    </div>
  )
}

export default CategoryPage