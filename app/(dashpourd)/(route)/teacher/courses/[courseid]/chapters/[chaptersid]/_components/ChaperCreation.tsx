 "use client"

import ConfirmModal from '@/components/modals/ConfirmModal'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Router, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface ChaperCreationProps {
    disabled : boolean,
    courseId : string,
    chapterId : string,
    isPublished : boolean


}

const ChaperCreation = ({ disabled,courseId,chapterId,isPublished  } : ChaperCreationProps) => {


  const [ isLoading , setIsLoading] = React.useState(false)

  // function on delete to the chapter
  const router = useRouter()

  const onClick = async ()=> {

    try {
      setIsLoading(true)

      if(isPublished){
       const data =   await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublished`)
        toast.success("chapter Unpublished")
        console.log(data , "Unpublished")
        router.refresh()
      } else {

        const data =  await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/published`)
        toast.success("chapter published")
        console.log(data , "published")
        
        router.refresh()

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

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success('Chapter deleted successfully')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    

     }  catch(e){
          console.log(e)
          toast.error('Failed to delete the chapter')
     } finally{
        setIsLoading(false)
     }
 
  }



  return (


    <div className='flex items-center gap-x-2'>

      {/* Publish Chapter */}
    <Button


 onClick={onClick}
disabled={disabled || isLoading}
variant="outline"
 size="sm"
      
      >
{isPublished ? "Unpublished" : "Publish"}


</Button>





{/*  delete Chapter  */}




<ConfirmModal onComfirm={onDelete} >

  
<Button  disabled={isLoading}>
        <Trash  className='h-4 w-4'/>
      </Button>

</ConfirmModal>
      



    </div>
  )
}

export default ChaperCreation