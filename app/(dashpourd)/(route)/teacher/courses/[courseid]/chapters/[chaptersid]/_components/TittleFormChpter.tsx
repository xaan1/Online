"use client"
import React, { useState } from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import Link from 'next/link';
  import toast from 'react-hot-toast';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';


interface TittleFormProps  {
  initialData: {
    title: string;
  };
  
    
  courseID : string,
  chapterId : string,

}


const formsShema = z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
  });
  

//   togglediting






const TittleFormChpter = ({
    initialData ,
    courseID,
    chapterId
    } : TittleFormProps) => {

        const [editing, setEditing] = useState(false)



        const toggleEditing = () =>   setEditing((currente) => !currente)




        const router =useRouter()
        const form = useForm<z.infer<typeof formsShema>>({
          resolver: zodResolver(formsShema),
          defaultValues: {
            title: "",
          },
        });


        const { isSubmitting, isValid } = form.formState;

        // onsubmit
        const onSubmit = async (values: z.infer<typeof formsShema>) => {
          console.log(values);
      
          try {
      
            const data = await axios.patch(`/api/courses/${courseID}/chapters/${chapterId}`, values);
            console.log(data , "teacher/courses/chapter")
            // console.log(data , "data")
            toast.success(' Course cahpter  Updated  successful')
            toggleEditing()
           router.refresh()
           
          }  catch(e){
      
            //  toast.error('Form submission failed.');
      
            console.log(e);
            toast.error('error updated  Tittle Course')
      
          }
      
      
      
        };


    return (

       


        <div className='mt-4 border bg-slate-100 rounded-md p-4 '>
           
           <div className='font-medium flex items-center justify-between'>

              <h1 className='text-lg'>Chapter Title</h1>
              
              <Button 

              
              onClick={toggleEditing}
              
              
              >
                

                {
                    editing && (
                        <>
                        cancel
                        </>
                    )

                }

                
                {
                    !editing && (
                        <Pencil className='text-slate-400  h-4 w-4 mr-2' />


                    )
                }
           
              </Button>
          

           </div>


{
    !editing && (
        <p className='text-slate-400 mt-2'>{initialData.title}</p>
    
    )
}



{
    editing && (
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 mt-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Course Title</FormLabel> */}
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Chapter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

   <div className='flex items-center gap-x-2'>

   <Button className='bg-red-700 text-white' variant = "ghost" type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
   </div>
    
          
        
          </form>
        
         
      </Form>
    
    )
}


        </div>
    )

}

export default TittleFormChpter

