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

interface CategoryProps  {
  initialData : Course

    
  courseID : string

  options: { label: string; value: string }[];

}


const formsShema = z.object({
  categoryId: z.string().min(1, {
      message: "Title is required",
    }),
  });
  

//   togglediting


  // selectCtegory

  


const CategoryForm = ({
  initialData,
    courseID,
    options
    } : CategoryProps) => {

        const [editing, setEditing] = useState(false)

        const SelcteCategory = options.find((category) => category.value === initialData.categoryId)



        const toggleEditing = () =>   setEditing((currente) => !currente)




        const router =useRouter()
        const form = useForm<z.infer<typeof formsShema>>({
          resolver: zodResolver(formsShema),
          defaultValues: {
            categoryId: initialData.categoryId || "",
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
            toast.success(' Course Updated category  successful')
            toggleEditing()
         router.refresh()
           
          }  catch(e){
      
            //  toast.error('Form submission failed.');
      
            console.log(e);
            toast.error('error updated  Tittle Course')
      
          }
      
      
      
        };


    return (

       


        <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Course Category
          <Button variant="ghost" onClick={toggleEditing}>
            {editing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Category
              </>
            )}
          </Button>
        </div>
        {!editing && (
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.categoryId && "text-slate-500 italic"
            )}>
            {SelcteCategory?.label || "No category"}
          </p>
        )}
        {editing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox {...field} options={options} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={isSubmitting || !isValid} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    );
  

}

export default CategoryForm