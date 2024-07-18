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
              include : {
                chapters : {
                    include : {
                        muxData : true
                    }
                }
              }
       })



         if(!Course) return new NextResponse("course not found", {status: 404})


            const hashPuplishedOneChapter = Course.chapters.some(chapter => chapter.isPublished)


            if(!Course.title || !Course.price || !Course.description || !Course.imageUrl || !Course.categoryId || !hashPuplishedOneChapter){
                return  NextResponse.json("Some fields are missing", {status : 400})
            }





            const Pupllished =  await db.course.update({
                where : {
                    id : params.id
                },
                data : {
                    isPublished : true
                }
            })


            return   NextResponse.json(Pupllished)





     }  catch(e){
            console.log(e , '[puplished  courses create]')
            
            return  new NextResponse("Internal Server error")
     }




}