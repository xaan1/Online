import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

import { Metadata, ResolvingMetadata } from "next";
import getProgress from '@/actions/Getprogress';
import CoursoSidbar from './_components/CoursoSidbar';
import CoursoNavbar from './_components/CoursoNavbar';
type Props = {
    children?: React.ReactNode;
    params: { courseId: string };
  };

const CoorsLayout = async (
    { children, params }: Props
) => {

   const {userId} = auth()


    if(!userId){
        return redirect("/")
    }

    const course: any = await db.course.findUnique({
        where: {
          id: params.courseId,
        },
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            include : {
                userProgres : {
                    where : {
                        userId
                    }
                    
                }
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      });

    if (!course) return redirect("/");

    const progresCount = await  getProgress(userId, course.id)
    console.log(progresCount , "progresCount")
  return (

    <div className='h-full'>

<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CoursoNavbar course={course} progressCount={progresCount} />
      </div>

        <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 '>
         <CoursoSidbar course={course}  progressCount ={progresCount} />
        </div>
        
        <main className='md:pl-80 h-full pt-[80px]'>
        {children}

        </main>
       

   


    </div>
  )
}

export default CoorsLayout