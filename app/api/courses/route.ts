import db from "@/lib/db"
import { isTeacher } from "@/lib/teacher"
import { auth } from "@clerk/nextjs/server"

import { NextRequest, NextResponse } from "next/server"



export async function POST(request : NextRequest){

    try {


        const {userId}  = auth()
      const IsAuthrized = isTeacher(userId)


        const {title} = await request.json()

        
        if(!userId || !IsAuthrized) return new NextResponse("userd is required", {status: 400})
     


        if(!title) return new NextResponse("Title is required", {status: 400})



            const course   = await db.course.create({
                data : {
                    title,
                    userId
                }

            })


            return  NextResponse.json(course)






    } catch(e){
        console.log(e , '[courses create api waaye]', e)
        return  new NextResponse("Internal Server error")
    }



}