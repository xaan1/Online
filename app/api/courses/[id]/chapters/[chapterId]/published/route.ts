
// create published function api

import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import toast from 'react-hot-toast';

export async function PATCH(request : NextRequest,  {params} : {params : {id : string , chapterId : string}}) {



     try {

        const {userId} = auth()

        if(!userId){
            return NextResponse.json("Unauthorized")
        }

        const OwnerCourse  = await db.course.findUnique({
            where : {
                id : params.id
            }
        
        })

         if(!OwnerCourse){
               return NextResponse.json("Course not found")
         }



         const chapter  =  await db.chapter.findUnique({
               where : {
                  id : params.chapterId,
                  courseId : params.id
               }
            
         })


         const muxData =  await db.muxData.findUnique({
            where : {
                chapterId : params.chapterId
            }
            
         })

        //  if(!chapter || !muxData || chapter.vedioUrl){
        //     return NextResponse.json("Chapter not found")
        //  }


       

         const puplishedChapter = await db.chapter.update({
            where : {
                id : params.chapterId,
                courseId : params.id
            
            },
            data : {
                isPublished : true
            }
         })


         return NextResponse.json(puplishedChapter)



     }  catch(e){
        console.log(e , "chapter is Puplished")
        return NextResponse.json("Internal Server error puplished")

     }

    
}