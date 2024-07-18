

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import { Attachment, Chapter  ,MuxData} from '@prisma/client';
;

interface GetChapterProps {
   userId : string,
   chaptId : string,
  courseId : string
    
}

  export const GetChapter  =  async ({userId , chaptId ,courseId } : GetChapterProps) => {
 
    try {


        const purchase = await db.purchase.findUnique({
            where: {
              userId_courseId: {
                courseId : courseId,
                userId,
              },
            },
          
        })

        console.log(purchase  ,"purchase from getChapter")
    


    
        const course =  await db.course.findUnique({
            where: {
            id: courseId,
            isPublished: true,
            },
            select : {
              price : true,
            }
            
        })

        const chapter = await db.chapter.findUnique({
            where: {
              id: chaptId,
              isPublished: true,
            },
           
  
        })

        if(!course || !chaptId)  throw new Error("Course or Chapter not found")


          let muxData  =  null;
          let attachments : Attachment[] = []
          let naxChapter : Chapter | null  = null




        if(purchase){
            attachments  = await db.attachment.findMany({
                where: {
                  courseId: courseId,
                },
          
            })
           
        }
        
        if (chapter?.isFree || purchase) {
            muxData = await db.muxData!.findUnique({
              where: {
                chapterId : chaptId,
              },
            });

            

            naxChapter =  await db.chapter.findFirst({
                where: {
                  courseId: courseId,
                  position: {
                    gt: chapter?.position,
                  },
                },
                orderBy: {
                  position: "asc",
                },
     
            })



        }


        const userProgress =   await db.userProgress.findUnique({
            where: {
              userId_chapterId: {
                chapterId: chaptId,
                userId,
              },
            },
        })


        return {
            chapter,
            course,
            attachments,
            loading : false,
            purchase,
            nextChapter : naxChapter,
            userProgress,
            muxData
        }




    } catch (error) {
      console.error(error ,"chapter error")
      return {
        chapter : null,
        error : error,
        course : null,
        attachments : [],
        nextChapter : null,
        loading : false,
        muxData  : null,
        purchase : null

      }
    }
}

export default GetChapter