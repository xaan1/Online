import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import db from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: { id: string }  }) {


     try {

        const { userId } = auth()

        if (!userId) return new NextResponse("userId is required", { status: 400 })


       const Course  =        await db.course.findUnique({
              where : {
                id : params.id,
                userId
              },
       })



         if(!Course) return new NextResponse("course not found", {status: 404})



            const UnPublished =  await db.course.update({
                where : {
                    id : params.id
                },
                data : {
                    isPublished : false
                }
            })


            return   NextResponse.json(UnPublished)





     }  catch(e){
            console.log(e , '[UnPupllished  courses create]')
            
            return  new NextResponse("Internal Server error, UnPupllished ")
     }




}