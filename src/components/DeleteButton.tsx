"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({id}:{id:string}) => {

  const router = useRouter()
  const deletePhoto = async(publicId:string)=>{
    const res = await fetch("/api/removeImage",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({publicId})
    })
  }
  const handleDelete = async()=>{
    const confirm = window.confirm("are you sure?")
    if(confirm){
      try {
        const res = await fetch(`/api/posts/${id}`,{
          method:"DELETE",
          headers:{
            "Content-type":"application/json"
          }
        })
        if(res.ok){
          console.log("post deleted")
          const {publicId} = await res.json()
         await  deletePhoto(publicId)
         toast.success("post deleted sucessfully")
         router.refresh()
        } 
    
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <button onClick={handleDelete} className='text-red-600 bg-slate-200  py-2 px-4 rounded-md '>Delete</button>
  )
}

export default DeleteButton