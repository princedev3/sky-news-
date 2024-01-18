

export interface Postprops{
    key:string,
    id:string,
    author:{
        name:string
    },
    authorEmail:string,
    date:string,
    imageUrl?:string ,
     category:string,
     title:string,
     content:string,
     links?:string[]|null,
     publicId?:string,
     createdAt:string,
     catName:string,
     posts:[]
   
 }
export interface catProps{
    catName:string,
    id:string,
   
   
 }