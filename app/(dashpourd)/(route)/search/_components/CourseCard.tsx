

import CourseProgress from '@/components/CourseProgress';
import { IconBadge } from '@/components/modals/icon-badge';
import { formatPrice } from '@/lib/format';
import { BookOpenCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type CourseCardProps ={

    title: string;
    imageUrl: string ;
    price: number ;
    progress: number | null ;
    category: string ;
    id: string;
    chaptersLength: number;
    
}

const CourseCard = ({title, imageUrl,progress, chaptersLength ,price, category,id} : CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition rounded-lg overflow-hidden cursor-pointer border p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden ">
          <Image fill className="object-cover" src={imageUrl} alt={title} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
            <IconBadge  size="sm" icon={BookOpenCheck} />
              <span>
                  {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>



          {
            progress !== null ? (
                <>
               
               <CourseProgress 

                value={progress}
                size='sm'
                variant= {progress === 100 ? "success" : "default"}
               
               />

                </>
            ) : (
                <>
                <p className='text-md md:text-sm font-medium text-slate-800'>

                    {formatPrice(price)}






                </p>

                </>
            )
          }


          
        </div>
      </div>
    </Link>
  )
}

export default CourseCard