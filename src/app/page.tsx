import Categories from '@/components/Categories'
import Post from '@/components/Post'
import { Postprops } from '@/lib/type'
import Image from 'next/image'
// import { postData } from '@/data'

const getPost = async():Promise<Postprops[] |null>=>{
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`,{
    cache:"no-store"
  })
  const posts = await res.json()
  if(res.ok){
    return posts
  }
  return null
}
export default async function Home() {
  const postData = await getPost()

  return (
    <main>
      <Categories/>
       {
          postData && postData.length >0 ? postData.map(post=>
            <Post key={post.id} id={post.id} author={post.author.name} authorEmail={post.authorEmail}
             date={post.createdAt||''} thumbnail={post.imageUrl} category={post.category} title={post.title} content={post.content} links={post.links || []} />): <p className='py-6'>No post to display</p>
       }
    </main>
  )
}
