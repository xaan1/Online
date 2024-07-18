 "use client"

import ConfirmModal from '@/components/modals/ConfirmModal'

import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/useConfettiStore'
import axios from 'axios'
import { Router, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface ChaperCreationProps {

    disabled : boolean,
    courseId : string,
    // chapterId : string,
    isPublished : boolean


}

const CourseAction = ({ disabled,courseId,isPublished  } : ChaperCreationProps) => {


  const [ isLoading , setIsLoading] = React.useState(false)

  // function on delete to the chapter
  const router = useRouter()
const confetti =  useConfettiStore()

  const onClick = async ()=> {

    try {
      setIsLoading(true)

      if(isPublished){
       const data =   await axios.patch(`/api/courses/${courseId}/unpublished`)
        toast.success("Course Unpublished")
        console.log(data , "Unpublished")
        router.refresh()
      } else {

        const data =  await axios.patch(`/api/courses/${courseId}/published`)
        toast.success("Course published")
        console.log(data , "published")
        confetti.onOpen()
        
       

      }

      router.refresh()


    } catch(e){
      console.log(e)
      toast.error("some tyhing wrong")
    } finally{
      setIsLoading(true)
    }

  }

  const onDelete = async() => {



     try {

      setIsLoading(true)

     const data  = await axios.delete(`/api/courses/${courseId}`)
      console.log(data , "delete")

      toast.success('Course deleted successfully')
      router.refresh()
      router.push(`/teacher/courses`)
    

     }  catch(e){
          console.log(e)
          toast.error('Failed to delete the chapter')
     } finally{
        setIsLoading(false)
     }
 
  }



  return (


    <div className='flex items-center gap-x-2'>


 <Button

 onClick={onClick}
disabled={disabled || isLoading}
variant="outline"
 size="sm"
      
      >
{isPublished ? "Unpublish" : "Publish"}

      </Button>





<ConfirmModal onComfirm={onDelete} >
<Button  disabled={isLoading}>
        <Trash  className='h-4 w-4'/>
      </Button>

</ConfirmModal>
      



    </div>
  )
}

export default CourseAction