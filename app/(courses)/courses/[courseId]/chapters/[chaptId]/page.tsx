
import GetChapter from '@/actions/GetChapter'
import Banner from '@/components/Banner'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import VedipPlayer from '../../_components/VedipPlayer'
import CoursoEnrollButton from '../../_components/CoursoEnrollButton'
import Preview from '@/components/modals/Preview'
import { Separator } from '@/components/ui/separator'
import { File } from 'lucide-react'
import CoursProgressButton from '../../_components/CoursProgressButton'

const page = async({params} : {params : {chaptId : string ,courseId : string }}) => {

  const {userId} = auth()

  if(!userId) return redirect("/")



  
 


    const {
      chapter,
      course,
      muxData,
      attachments,
      userProgress,
      nextChapter,
      purchase
    

    } = await  GetChapter({
      userId,
      chaptId : params.chaptId,
      courseId : params.courseId
    
    })

    console.log(!!attachments , "attachments")


    if(!chapter || !course) return redirect("/")



      const isLocked =  !chapter.isFree &&  !purchase

      console.log(isLocked , "isLocked waaye")



      const isCompetedOnEnd  =   !!purchase && userProgress?.isCompleted
      // const isCompleted =  purchase && userProgress?.isCompleted
      console.log(isCompetedOnEnd , "isCompetedOnEnd waaye")
  return (
    <div>


      {
        userProgress?.isCompleted && (
          <>
          <Banner variant= "success" label='You AL ready completed this chapter'  />
      
     
          </>
        )
      }

{
        isLocked && (
          <>
          <Banner variant= "warning" label='You  Need Purchase to watch this chapter'  />
          </>
        )
      }


      <div className='flex flex-col w-full mx-auto pb-20'>
        
<div className='p-6'>
  <VedipPlayer  
  chapterId = {params.chaptId}
  coursoID={params.courseId}
  title ={chapter.title}
  nextChapteriD ={nextChapter?.id!}
  isLocked={isLocked}
  completEndOne={isCompetedOnEnd!}
  plybackId={muxData?.playbackId!}
  

  />




<div>
  <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
  <h2 className='text-2xl font-sm-bold'>
    {chapter.title}
  </h2>

  {
    purchase ? (
    <div>

  <CoursProgressButton 

chaptId={params.chaptId}
coursId={params.courseId}
isCompleted ={!!userProgress?.isCompleted}
nextChapter ={nextChapter?.id!}
  
  />

      </div>
     
    ) : (
     <CoursoEnrollButton 

      courseId={params.courseId}
      price={course.price!}

     
     />
    )
  }


  </div>

  <Separator />
  <Preview value={chapter.description!}/>
</div>

{
  !!attachments.length && (

   <>
   <Separator />
   <div className=''>
    {
      attachments.map((attachment) => (
        <div key={attachment.id} className='p-4'>
          <a className='flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline' href={attachment.url} target='_blank' rel='noreferrer'>
            <File className='w-6 h-6 mr-2' />
            <p className='line-clamp-1'>
            {attachment.name!}
              </p> 
          </a>
      
        </div>
      ))

    }

   </div>
   </>

  )
}
 


</div>

      </div>





    </div>
  )
}

export default page