
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

import { NextRequest, NextResponse } from "next/server"
import Mux from "@mux/mux-node";
import { isTeacher } from "@/lib/teacher";



const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  



export async function PATCH(request : NextRequest , {params} : {params : {id : string}}){

    try {


        const {userId}  = auth()
        const IsAuthrized = isTeacher(userId)

        if(!userId || !IsAuthrized) return new NextResponse("userId is required", {status: 400})
     

   


        const values  = await request.json()

        
        


        if(!values) return new NextResponse("values is required", {status: 400})




            const update   = await db.course.update({
                where : {
                    id : params.id,
                    userId
                },
                data : {
                    ...values
                }

            })


            return  NextResponse.json(update)






    } catch(e){
        console.log(e , '[update courses create],' , e)
        
        return  new NextResponse("Internal Server error")
    }



}




// delete the course


export async function DELETE(request : NextRequest , {params} : {params : {id : string}}){

    try {


        const {userId}  = auth()
        const IsAuthrized = isTeacher(userId)

        if(!userId || IsAuthrized)  return new NextResponse("userId is required", {status: 400})



        const course = await db.course.findUnique({
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




        if(!course) return new NextResponse("course not found", {status: 404})



            for(let chapter of course.chapters){
                if(chapter.muxData?.assetId){
                    await video.assets.delete(chapter.muxData.assetId)
                }
            }
            

          const deletedCourse =    await db.course.delete({
                where : {
                    id : params.id
                }
            })


            return  NextResponse.json(deletedCourse)





    } 
    catch(e){
        console.log(e , '[delete courses create]')
        
        return  new NextResponse("Internal Server error")
    }

}