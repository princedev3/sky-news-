import React from 'react'
// import   {categoriesData}  from "@/data"
import Link from 'next/link'
import { catProps } from '@/lib/type'

const getCategory = async():Promise<catProps[] |null|undefined>=>{
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`,{
    cache:"no-store"
  })

  if(res.ok){
  return await res.json()
  }
}
const Categories = async() => {

  const categoriesData = await getCategory()

  return (
    <div className='flex gap-2 text-sm flex-wrap '>
        {
            categoriesData && categoriesData.map(category=>(
                <Link className='px-4 py-1 rounded-md bg-slate-800 text-white hover:scale-105 transition-all' key={category.id} href={`/categories/${category?.catName}`}>{category?.catName} </Link>
            ))
        }
    </div>
  )
}

export default Categories