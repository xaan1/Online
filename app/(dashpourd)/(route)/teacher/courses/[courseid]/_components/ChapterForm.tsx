 "use client"
import React, { useState } from 'react'
import { any, z } from "zod";
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
import { Loader2, Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Textarea } from "@/components/ui/textarea"
import { Chapter, Course } from '@prisma/client';
// import CompoBox from '@/components/CompoBox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup } from '@radix-ui/react-select';
import { Label } from '@/components/ui/label';


import { Combobox } from '@/components/Compopx';
import ChapterList from './ChapterList';


interface ChapterFormProps  {
  initialData : Course & { chapters : Chapter[]}
  courseID : string

}


const formsShema = z.object({
   title : z.string().nonempty(),


  

  });
  

//   togglediting


  // selectCtegory

  


const ChapterForm = ({
  initialData,
    courseID,
    } : ChapterFormProps) => {

         
         const [isCreating,setIsCreating] = useState(false)

          const [isUpdate, setUpdate] = useState(false)

        // const Selctecategory =  "xaan"



        const toggleCreating = () =>   setIsCreating((currente) => !currente)



        const router =useRouter()
        const form = useForm<z.infer<typeof formsShema>>({
          resolver: zodResolver(formsShema),
          defaultValues: {
            title:  "",
          },
        });


        const { isSubmitting, isValid } = form.formState;

        // onsubmit
        const onSubmit = async (values: z.infer<typeof formsShema>) => {
          console.log(values);
      
          try {
      
            const data = await axios.post(`/api/courses/${courseID}/chapters`, values);
            // console.log(data , "cahpter/courses")
            console.log(data , "data")
            toast.success(' Course cahpters careated  successful')
            toggleCreating()
            router.refresh()
           
          }  catch(e){
      
            //  toast.error('Form submission failed.');
      
            console.log(e);
            toast.error('error updated  Tittle Course')
            return
      
          }
      
      
      
        };



        const onEdit  = (id : string)=> {
          router.push(`/teacher/courses/${courseID}/chapters/${id}`)

        }

        // crete function onReorder

        const onReorder = async (updateData : {id : string , position : number}[]) => {

          try {

            setUpdate(true)
             await axios.put(`/api/courses/${courseID}/chapters/reorder`, {
              list : updateData 
            });
            console.log( "response")
            toast.success("Chapters reordered successfully");
            // toggleCreating()
            router.refresh()
            return

          }  catch(e){
            toast.error("Something went wrong");
            console.log(e , "error onReorder")
          } finally {
            setUpdate(false)
            return
          }
        }




    return (

       


        <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
          {isUpdate && (
            <div className='absolute h-full min-w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
              <Loader2  className ="an animate-spin h-6 w-6 text-sky-700"/>

            </div>

          )
        }
        <div className="font-medium flex items-center justify-between">
          Course Chapter
          <Button variant="ghost" onClick={toggleCreating}>
            {isCreating ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                ADD Chapter
              </>
            )}
          </Button>
        </div>
        
        {isCreating && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                   
                   <Input {...field} placeholder="Chapter Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={isSubmitting || !isValid} type="submit">
                  Create 
                </Button>
              </div>
            </form>

  
           
          </Form>
        )}

{!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
          {!initialData.chapters.length &&  "No chapters"}

          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
      </div>
    );
  

}

export default ChapterForm