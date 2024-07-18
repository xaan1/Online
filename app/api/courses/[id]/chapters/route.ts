import db from "@/lib/db"
import { isTeacher } from "@/lib/teacher"
import { auth } from "@clerk/nextjs/server"

import { NextRequest, NextResponse } from "next/server"



export async function POST(request : NextRequest , {params} : {params : {id : string}}){

    try {


        const {userId}  = auth()


        const {title} = await request.json()

        const IsAuthrized = isTeacher(userId)

        
        if(!userId || !IsAuthrized) return new NextResponse("Title is required", {status: 400})
     


        if(!title) return new NextResponse("Title is required", {status: 400})



            const OwnerCourse =  await db.course.findUnique({
                where : {
                    id : params.id,
                    userId
                }
            }) 

           
            if(!OwnerCourse) return new NextResponse("Course not found", {status: 404})


                 const lastChapter = await db.chapter.findFirst({
                        where : {
                            courseId : params.id
                        },
                        orderBy : {
                            position : 'desc'
                        }
                    
                 })

                 const newPostion =  lastChapter ? lastChapter.position + 1 : 1


            const chapter   = await db.chapter.create({
                data : {
                    title ,
                    courseId : params.id,
                    position : newPostion
                }

            })


            return  NextResponse.json(chapter)






    } catch(e){
        console.log(e , '[courses Chapter create]')
        return  new NextResponse("Internal Server error")
    }



}