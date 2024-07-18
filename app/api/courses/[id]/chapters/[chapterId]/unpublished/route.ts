
// create published function api

import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request : NextRequest,  {params} : {params : {id : string , chapterId : string}}) {



     try {

        const {userId} = auth()
        console.log(params.id , "chapter is Puplished")
        console.log(params.chapterId , "chapter is Puplished")

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



         const UnPoplishedChapter = await db.chapter.update({
            where : {
                id : params.chapterId
            },
            data : {
                isPublished : false
            }
         })



         const puplishdChapterIncourse = await db.chapter.findMany({
                where : {
                    courseId : params.id,
                    isPublished : true
                }
            
         })


            if(!puplishdChapterIncourse.length){
              
                await db.course.update({
                    where : {
                        id : params.id
                    },
                    data : {
                        isPublished : false
                    }
                })
            }



         return NextResponse.json(UnPoplishedChapter)



     }  catch(e){
        console.log(e , "chapter is UnPuplished")
        return NextResponse.json("Internal Server error puplished")

     }

    
}