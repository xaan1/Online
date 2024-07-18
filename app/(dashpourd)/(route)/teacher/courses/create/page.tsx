"use client";

import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import axios from "axios"
// import { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
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

const formsShema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {


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

      const data = await axios.post("/api/courses", values);
      console.log(data , "teacher/courses")
      console.log(data , "data")
      toast.success(' Course Created successful')
       router.push(`/teacher/courses/${data.data.id}`)
     
    }  catch(e){

      // toast.error('Form submission failed.');

      console.log(e);
      toast.error('error created Tittle Course')

    }



  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div className="mt-20">
        <h1 className="text-2xl mb-4">Name Your Course</h1>
        <p className="text-sm text-slate-400 mb-6">
          Give your course a name that will attract students
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 mt-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>

                    <Input
                      disabled={isSubmitting}
                      placeholder="Course title"
                      {...field}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="">
                <Button type="button" variant= "xaan">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* <Toaster /> */}
    </div>
 
  );
};

export default CreatePage;
