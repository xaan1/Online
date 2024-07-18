import db from '@/lib/db';
import React from 'react';
import Categorysearch from './_components/Categorysearch';
import SeacrInbut from '@/components/modals/SeacrInbut';
import { getCourses } from '@/actions/GetCourses';
import { auth } from '@clerk/nextjs/server';
import CoursesList from './_components/CoursesList';

type Props = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};


const page = async ({ searchParams } : Props) => {
  const { userId } = auth();
  if (!userId) return null;


  console.log("searchParams" , searchParams.categoryId);

  const categories = await db.category.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  

  const courses = await getCourses({
    userId,
   ...searchParams
  });


  return (
    <>
      <div className="p-6 pt-6 md:hidden md:mb-0 block">
        <SeacrInbut />
        {/* mopil side waaaye */}
      </div>
      <div className="p-6 space-y-9">
        <Categorysearch items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default page;