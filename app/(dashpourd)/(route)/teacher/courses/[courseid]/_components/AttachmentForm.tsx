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
import { File, ImageIcon, Loader, Pencil, PlusCircle, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from "@/components/ui/textarea"
import { Course, Attachment } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';


interface AttachmentForm {
    initialData : Course & {  attachments : Attachment[]};
    courseID: string;
}

const formsShema = z.object({
    url: z.string().min(1, {
        message: "url is required",
    }),
});

const AttachmentForm = ({ initialData, courseID }: AttachmentForm) => {

    const [editing, setEditing] = useState(false);
    // state deleting
    const [deleting, setDeleting] = useState<string | null>(null);


    const toggleEditing = () => setEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formsShema>>({
        resolver: zodResolver(formsShema),
       
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formsShema>) => {
        try {
          await axios.post(`/api/courses/${courseID}/attachment`, values);
          toast.success("Course updated successfully");
          toggleEditing();
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        }
      };



    //   ondelete function attachmnete

    const onDelete = async (id: string) => {
        try {
          setDeleting(id);
          await axios.delete(`/api/courses/${courseID}/attachment/${id}`);
          toast.success("Attachment deleted successfully");
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        } finally {
          setDeleting(null);
        }
      };


    


    return (

        <div className='mt-4 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                <h1 className='text-lg'>Course Attchmnets</h1>
                <Button onClick={toggleEditing}>
                    {editing && <h3>Cancel</h3>}
                    {!editing &&  (
                        <>
                            <PlusCircle className='mr-2' />
                            <h3>Add attachments</h3>
                        </>
                    )}
                   
                </Button>

                
            </div>

            {!editing && (
               <>
  {
    initialData.attachments.length == 0  && (
        <>
        <p className='text-sm italic'>

            No Attchments
            </p>


        </>
    )

  } 

  {
     initialData.attachments.length > 0 && (
        <div>
        {initialData.attachments.map((attachment) => (
            <div key={attachment.id} className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <File className='w-6 h-6 mr-2' />
                    <Link href={attachment.url} target='_blank' className='text-blue-500 underline'>{attachment.url}</Link>
                </div>
             


                {
                    deleting === attachment.id && (
                        <div>
                            <Loader  className='h-4 w-3 animate-spin'/>
                            </div>
                    )
                }


{
                    deleting !== attachment.id && (

                        <button

                        onClick={() => onDelete(attachment.id) }
                        
                        className='ml-auto hover:opacity-75'>
                            <XIcon  className='h-4 w-3 '/>
                            </button>
                    )
                }


                

            </div>
        ))}
        </div>
     )
  }

               
               </>
            )}

            {editing && (
                <div>
                    <FileUpload
                        endpoint='courseAttachment'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url })
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default AttachmentForm
