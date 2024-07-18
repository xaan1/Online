 "use client"
import React, { useState } from 'react'

import { Check, CheckCircle, XCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import axios from 'axios';
import toast from 'react-hot-toast';

interface  CourseButton {
    chaptId : string,
    coursId: string
    isCompleted?: boolean,
    nextChapter : string
}



const CoursProgressButton = ({chaptId  ,coursId ,isCompleted ,nextChapter} :CourseButton ) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
          setIsLoading(true);
    
           const progress =  await axios.put(
            `/api/courses/${coursId}/chapters/${chaptId}/progress`,
            {
              isCompleted: !isCompleted,
            }
        
          );

          
          console.log(progress ,"progress")
    
          if (!isCompleted && !nextChapter) {
            confetti.onOpen();
          }
    
          if (!isCompleted && nextChapter) {
            router.push(`/courses/${coursId}/chapters/${nextChapter}`);
          }
    
          toast.success("Progress updated successfully");
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };


    const Icon = isCompleted ? XCircle : Check

  return (

    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      onClick={onClick}
    //   disabled={isLoading}
      className="w-full md:w-auto rounded-sm">
      {isCompleted ? "Not completed" : "Mark as completed"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  )
}

export default CoursProgressButton