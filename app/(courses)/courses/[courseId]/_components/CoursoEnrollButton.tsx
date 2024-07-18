"use client";

import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface CoursoEnrollButtonProps {
    courseId : string,
    price : number

     
}
const CoursoEnrollButton =  ({courseId ,price } : CoursoEnrollButtonProps) => {


  const [isLoading, setIsLoading] = useState(false);

  
  const onClick = async () => {
    try {

      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/chekout`);
      console.log(response)

      window.location.assign(response.data.url);
    } catch (error) {
      console.log(error , 'stripe')
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button 
    onClick={onClick}
    disabled={isLoading}
    variant="xaan"
    size="sm"
    className='w-full md:w-auto'
    >
        Enroll Now

    </Button>
  )
}

export default CoursoEnrollButton