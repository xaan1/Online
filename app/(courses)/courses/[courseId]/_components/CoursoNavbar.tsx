
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { Menu } from 'lucide-react';
import React from 'react'

import CoursoSidbar from './CoursoSidbar';
import NavbarRouter from '@/components/NavbarRouter';

type Props = {
    course: Course & {
      chapters: (Chapter & { userProgress: UserProgress[] | null })[];
    };
    progressCount: number;
  };

const CoursoNavbar = ( {course , progressCount} :Props ) => {

    return (
      <div  className='P-4 border-b h-full flex items-center bg-white'>
        <NavbarRouter />

<Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
      
        <h3>
          <Menu className="h-6 w-6" />
        </h3>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CoursoSidbar course={course} progressCount={progressCount} /> 
      </SheetContent>
    </Sheet>
      </div>

 
      );
  
}

export default CoursoNavbar