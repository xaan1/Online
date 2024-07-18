import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidbarItem from './CourseSidbarItem';
import CourseProgress from '@/components/CourseProgress';




type Props = {
    course: Course & {
      chapters: (Chapter & { userProgress: UserProgress[] | null })[];
    };
    progressCount: number;
  };
  

const CoursoSidbar = async({course  ,progressCount} :Props ) => {


    const {userId} = auth()
    if(!userId){
        redirect("/")
    }



    const purchase = await db.purchase.findUnique({
        
      where : {
        userId_courseId : {
          courseId : course.id,
          userId : userId
      }
    }
    })


    console.log(progressCount , "progressCount value")
 

 




  return (
    <div className='h-full flex flex-col border-r overflow-y-auto shadow-sm '>
       
       <div className='p-8 flex-col border-b'>
        
        <h1 className='font-semibold'>
          {course.title}
          </h1>
          {
            purchase && (
              <div className='mt-10'>
                <CourseProgress 
                variant="success" value={progressCount}
                
                
                />


                </div>
            )

          }
             

              
       </div>



       <div className='flex flex-col w-full'>
        {
          course.chapters.map((chapter, index) => (
          


<CourseSidbarItem
             key={chapter.id}
             id={chapter.id}
             label={chapter.title}
             isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked ={!chapter.isFree && !purchase}
             
             />
            
          

            
    

            

           
            

          ))
        }

       </div>



    </div>
  )
}

export default CoursoSidbar