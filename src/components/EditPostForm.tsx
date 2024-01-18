"use client";
import React, { useEffect, useState } from "react";
import { Postprops } from '@/lib/type'
import Link from "next/link";
import { catProps } from "@/lib/type";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
// import { NextResponse } from "next/server";

const EditPostForm = ({post}:{post:Postprops}) => {
  const router = useRouter()
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const[categories,setCategories]=useState<catProps[]>([])
   const [title,setTitle] = useState("")
   const[content,setContent]=useState("")
   const[publicId,setPublicId]=useState(post.publicId||"")
   const[imageUrl,setImageUrl]=useState("")
   const[selectedCategory,setSelectedCategory]=useState(post.catName ||"")

  

    
 
  const addLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
    try {
      
    } catch (error) {
      console.log(error)
    }
  };

 

useEffect(()=>{
  const fetchCategory = async()=>{
    const res = await fetch(`/api/categories`)
    const catNames = await res.json()
  
    setCategories(catNames)
  }
  fetchCategory()

  const initValue=()=>{
    setTitle(post.title)
    setContent(post.content)
    // setPublicId(post.publicId||"")
    setImageUrl(post.imageUrl||"")
    setSelectedCategory(post.catName||"")
    setLinks(post.links||[])
  }
  initValue()
},[post.title,post.content,post.publicId,post.imageUrl,post.catName,post.links])



  const DeleteLink= async(idx:number)=>{
    setLinks(prev=>prev.filter((_,i)=>i !==idx))
  }


  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!title || !content|| !selectedCategory){
      toast.error("title and content required")
      return
    }
    try {
      const res = await fetch(`/api/posts/${post.id}`,{
        method:"PUT",
        headers:{
          "Context-type":"application/json"
        },
        body:JSON.stringify({
          title,content,links,catName:selectedCategory,imageUrl,publicId
        })
      })

      if(res.ok){
        toast.success("post edited successfully")
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("something went wrong")
      console.log(error)
    
    }
  }

  const handleUpload = (result:CldUploadWidgetResults)=>{
    const info = result.info as object

    if("secure_url" in info && "public_id" in info){
      const url = info.secure_url as string
      const publicId = info.public_id as string
      setImageUrl(url)
      setPublicId(publicId)
      
    }
  }

  const removeImage =async (e:React.FormEvent)=>{
     e.preventDefault()
    try {
      const  res = await fetch(`/api/removeImage`,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({publicId})
       })
  
       if(res.ok){
        setImageUrl("")
        setPublicId("")
       }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h2>Create Post</h2>

      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Title" value={title}  onChange={e=>setTitle(e.target.value)}/>
        <textarea name="" id="" placeholder="content" value={content} onChange={e=>setContent(e.target.value)} ></textarea>
        {links &&
          links.map((link, i) => (
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>

              <Link className="link font-light text" href={link} key={i}>
                {link}{" "}
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer text-red-500"
                onClick={()=>DeleteLink(i)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          ))}
        <div className="flex ">
          <input
            type="text"
            placeholder="paste the link and click on add"
            className=" flex-1"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
          <button className="btn flex" onClick={addLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            add
          </button>
        </div>

        <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_cloudinary_uploadPreset}
         onUpload={handleUpload}
        className={`${imageUrl && "pointer-events-none "} h-56 w=full border-dotted grid place-items-center bg-slate-100 rounded-md relative`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {
            imageUrl && <Image src={imageUrl} fill alt="" className="object-cover absolute inset-0 overflow-hidden rounded-md "/>
          }
        </CldUploadButton>
        {publicId || imageUrl && <button onClick={removeImage} className="rounded-md py-2 px-4 font-bold w-fit bg-red-600 text-white">remove image</button>}
        <select value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} name="" id="" className="p-3 rounded-md appearance-none border">
          <option value="">select a category</option>
          {categories &&
           categories.map((category) => (
              <option key={category.id} value={category.catName}>
                {category.catName}{" "}
              </option>
            ))}
        </select>
        <button type="submit" className="primary-btn">
          {" "}
       Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm




