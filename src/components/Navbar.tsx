"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { status, data: session } = useSession();

  const [isVisible,setIsVisible]= useState(false) 
 
  const popupRef = useRef<HTMLDivElement|null>(null)


  useEffect(()=>{
      const handleCloseOutside = (e:MouseEvent)=>{
         if(popupRef.current && !popupRef.current.contains(e.target as Node)){
          setIsVisible(false)
         }
      }
      document.addEventListener("click",handleCloseOutside)

      if(!isVisible){
        document.removeEventListener("click",handleCloseOutside)
      }
      return ()=>{
        document.removeEventListener("click",handleCloseOutside)
      }
  },[isVisible])
  return (
    <div className="flex justify-between border-b pb-4 mb-4 relative ">
      <div>
        <Link href={"/"}>
          <h2 className="text-3xl font-bold tracking-tighter text-dark">
            Sky-News
          </h2>
          <p className="text-sm">
            Exploring Tomorrow's Innovations, <br />
            On Byte at a Time.
          </p>
        </Link>
      </div>
      {status === "authenticated" ? (
        <div className="">
          <div ref={popupRef} className={`${isVisible?"flex absolute z-30 right-0 top-20 rounded-md shadow-lg  flex-col gap-2 p-6 bg-white min-w-[160px] text-right":"hidden absolute z-30 right-0 top-20 rounded-md shadow-lg  flex-col gap-2 p-6 bg-white min-w-[160px] text-right "}`}>
            <p className="font-bold">{session.user?.name}</p>
            <p>{session.user?.email}</p>
            <Link href={"/dashboard"} className="hover:underline">Dashboard</Link>
            <Link href={"/create-post"} className="hover:underline ">Create Post</Link>
            <button className="btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link href={"/create-post"} className=" hidden md:flex  cursor-pointer ">
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              create new
            </Link>
            <Image
            onClick={()=>setIsVisible(!isVisible)}
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt=""
              className="rounded-full object-cover cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
