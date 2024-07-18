
import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { ArrowLeft, Eye, LayoutDashboard, VideoIcon } from 'lucide-react'

import Link from 'next/link'
import React from 'react'
import TittleFormChpter from './_components/TittleFormChpter'
import { redirect } from 'next/navigation';
import DescrptioChpter from './_components/DescrptioChpter'
import ChapterAcees from './_components/ChapterAcees'
import VedioFprm from './_components/VedioFprm'
import Banner from '@/components/Banner'
import ChaperCreation from './_components/ChaperCreation'
import { IconBadge } from '@/components/modals/icon-badge'



const page = async({params} : {params : {courseid : string, chaptersid : string}}) => {


    const {userId} = auth()

    if(!userId){
        if (!userId) {
            return redirect("/");
          }
    }

    const chapters =  await db.chapter?.findUnique({
        where : {
            id : params.chaptersid,
            courseId : params.courseid
        },
        include : {
            muxData : true
        }

    })

if(!chapters) return redirect("/")


    const requiredFields = [
        chapters.title,
        chapters.description,
        chapters.vedioUrl,
    ]

    const totalField =  requiredFields.length
    const completionField  =  requiredFields.filter(Boolean).length


    const competedField = `${completionField}/${totalField} fields completed`
 
     const isCompleted = requiredFields.every(Boolean)

  return (
    <>

    

{
        !chapters.isPublished && (
            
            <Banner variant="warning" label="This chapter is not published yet" />
        )
    }
    

<div className='p-6'>

<div className='flex items-center justify-between'>

    <div className='w-full '>
        <Link href={`/teacher/courses/${params.courseid}`} className='
        flex items-center text-sm hover:opacity-90 transition mb-4'>
      
      <ArrowLeft className='h-5 w-5 mr-2' />
      Back To course
        </Link>


        <div className='flex items-center justify-between w-full'> 
            <div className='flex flex-col gap-x-2'>
                <h1>Chapter Creation</h1>
                <span>
                    Complete ALL Field {competedField}
                </span>

            </div>

            <ChaperCreation   

            disabled={!isCompleted}
            courseId={params.courseid}
            chapterId={params.chaptersid}
            isPublished={chapters.isPublished}
            
            
            />

        </div>
       

    </div>
</div>




<div className='grid grid-cols- md:grid-cols-2 gap-x-2 mt-10 '>

    <div className='space-y-4'>
        <div>
            
            <div className='flex items-center gap-x-2'>
                 <IconBadge  icon={LayoutDashboard}  /> 
                <h2>Customize  Your Chapters</h2>

            </div>
            <TittleFormChpter  initialData={chapters}   courseID={params.courseid} chapterId={params.chaptersid} />
            <DescrptioChpter  initialData={chapters}   courseID={params.courseid} chapterId={params.chaptersid} />
        </div>
        <div>
            <div className='flex items-center gap-x-2'>
                  <IconBadge   icon={Eye} />
                <h2 className='text-2xl'>Acces Setting..</h2>
            </div>
            <ChapterAcees 

            initialData={chapters}
            courseID={params.courseid}
            chapterId={params.chaptersid}
            
            />
        </div>





    </div>
    

    
{/* vedio */}


    <div>

<div className='flex items-center gap-x-2 ml-7'>
 <IconBadge   icon={VideoIcon} />
<h2 className='text-2xl'>Vedio Setting..</h2>
</div>

<VedioFprm 

initialData={chapters}
courseID={params.courseid}
chapterId={params.chaptersid}


/>


</div>

</div>



</div>
    </>
  
  )
}

export default page