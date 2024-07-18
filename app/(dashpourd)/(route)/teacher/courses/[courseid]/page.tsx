
import db from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import TittleForm from './_components/TittleForm';
import Description from './_components/Descrption';
import ImageForm from './_components/ImageForm';
import { Category } from '@prisma/client';
import CategoryForm from './_components/CategoryForm';
import { BoxIcon, CircleDollarSign, ListChecks , File, Layout, LayoutDashboard, FileArchive, FileAudioIcon } from 'lucide-react';
import PriceForm from './_components/PriceForm';
import AttachmentForm from './_components/AttachmentForm';
import ChapterForm from './_components/ChapterForm';
import Banner from '@/components/Banner';
import CourseAction from './_components/CourseAction';
import { IconBadge } from '@/components/modals/icon-badge';



const Page = async ({ params }: { params: { courseid: string } }) => {
  // Fetch user ID
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }



  try {
    const course = await db.course.findUnique({
      where: {
        id: params.courseid,
        userId,
      },
  
   
       include : {
        chapters : {
          orderBy : {
            position : 'asc'
          }

        },


        attachments : {
        orderBy : {
             createdAt : 'desc'
          }
        }
      }
    });
    // console.log(course)

    const categories = await db?.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    

    if (!course) {
      return  console.log("Course not found");
    }

    // Required fields
    const requiredFields = [
      course?.title,
      course?.price,
      course?.description,
      course?.imageUrl,
      course?.categoryId,
      course.chapters.some((chapter) => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `${completedFields}/${totalFields} fields completed`;

    const isCompeted = requiredFields.every(Boolean);

    return ( 
      <>
      {
        !course.isPublished && (
          <Banner
          
            label="This course  is not unpublished , it will be not visible to studente  " />
         

        )
      }

<div className="p-6">


        <div className="flex items-center justify-between">

          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl">Course Details</h1>
            <p className="text-sm text-slate-400">
              Complete the following fields to make your course live
            </p>
            <p className="text-sm text-slate-400">{completionText}</p>
          </div>
          {/* action */}
          
          <CourseAction 
          isPublished={course.isPublished}
          disabled={!isCompeted}
          courseId={course.id}
      
          />

        </div>




        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          
          <div>

            <div className="flex items-center gap-x-2">
              <IconBadge  icon={LayoutDashboard}  />
              <h2 className="text-2xl">Customize Your Course</h2>
            </div>

            <TittleForm initialData={course} courseID={course.id} />
            <Description initialData={course} courseID={course.id} />
            <ImageForm initialData={course} courseID={course.id} />

            
            <CategoryForm
              initialData={course}
              courseID={course.id}
              
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />

          
          </div>


  <div className="space-y-7">

    <div className="">

      <div className='flex items-center gap-x-5'>

         <IconBadge  icon={ListChecks } /> 

        <h2 className='text-2xl'>Course Chapters</h2>
      </div>
      <div>
      <ChapterForm initialData={course} courseID={course.id} />
       </div>
 

    </div>



  <div>

    <div>

      <div className='flex items-center gap-x-5'>
      <IconBadge icon={CircleDollarSign}  /> 
        <h2 className='text-2xl'>Sell Your Content</h2>
      </div>

      <PriceForm   
        initialData={course}
        courseID={course.id}
      
      />
   
      
      

      
    </div>


    <div className="mt-1">
              <div className="flex items-center gap-x-2">
      
                 <IconBadge icon={File}  /> 
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm  initialData={course} courseID={course.id} />
            </div>
          </div>









  </div>


        </div>
      </div>
      </>

      
    );
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return redirect("/");
  }
};

export default Page;
