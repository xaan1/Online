import db from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async({params} : {params : {courseId : string }}) => {



   try {

    const course =  await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        }
      }
    })
  
   }  catch(e){
    console.log(e)
   }


   const course =  await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      }
    }
  })

  return (
    <div>

      <h1>Course Page</h1>
      <h2>Course ID: {params.courseId}</h2>
    </div>
  )
}

export default page