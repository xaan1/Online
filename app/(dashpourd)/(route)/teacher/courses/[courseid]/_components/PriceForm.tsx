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
import { cn } from '@/lib/utils';

import { Textarea } from "@/components/ui/textarea"
import { Course } from '@prisma/client';
import { formatPrice } from '@/lib/format';




interface PrciceProps  {
  initialData : Course
    
  courseID : string

}


const formsShema = z.object({
  price: z.number().min(1, {
      message: "Title is required",
    }),
  });
  

//   togglediting






const PriceForm = ({
  initialData,
    courseID
    } : PrciceProps) => {

        const [editing, setEditing] = useState(false)



        const toggleEditing = () =>   setEditing((currente) => !currente)




        const router =useRouter()
        const form = useForm<z.infer<typeof formsShema>>({
          resolver: zodResolver(formsShema),
          defaultValues: {
            price: initialData.price || undefined,
          },
        });


        const { isSubmitting, isValid } = form.formState;

        // onsubmit
        const onSubmit = async (values: z.infer<typeof formsShema>) => {
          console.log(values);
      
          try {
      
            const data = await axios.patch(`/api/courses/${courseID}`, values);
            console.log(data , "teacher/courses")
            console.log(data , "data")
            toast.success(' Course Updated  successful')
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


              <h1 className='text-lg'>Course Pice</h1>
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
      <p className={cn('text-sm gab-x-2' , !initialData.price &&  "text-slate-500")} >


    

    {
      initialData.price ? formatPrice(initialData?.price) : "no Price"

    }
      </p>
       
    )
}



{
    editing && (

        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 mt-10">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Course Title</FormLabel> */}
                  <FormControl>
                  <Input 

   type='number'
               
                  placeholder='enetrr a price'

                  {...field}
                  //  onChange={(e) => }
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  step="0.01"
                  
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

export default PriceForm