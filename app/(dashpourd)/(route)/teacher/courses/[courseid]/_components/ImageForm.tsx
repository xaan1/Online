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
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from "@/components/ui/textarea"
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface ImageFormProps {
    initialData: Course;
    courseID: string;
}

const formsShema = z.object({
    imageUrl: z.string().min(1, {
        message: "Title is required",
    }),
});

const ImageForm = ({ initialData, courseID }: ImageFormProps) => {

    const [editing, setEditing] = useState(false);

    const toggleEditing = () => setEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formsShema>>({
        resolver: zodResolver(formsShema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formsShema>) => {
        console.log(values);

        try {
            const data = await axios.patch(`/api/courses/${courseID}`, values);
            // console.log(data, "teacher/courses")
            console.log(data, "data")
            toast.success('Course Updated images  successfully')
            toggleEditing()
            router.refresh()

        } catch (e) {
            console.log(e);
            toast.error('Error updating Course Title')
        }
    };

    return (

        <div className='mt-4 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                <h1 className='text-lg'>Course imageUrl</h1>


                <Button onClick={toggleEditing}>
                    {editing && <h3>Cancel</h3>}

                    {!editing && !initialData?.imageUrl && (
                        <>
                            <PlusCircle className='mr-2' />
                            <h3>Add Images</h3>
                        </>
                    )}

                    
                    
                    {!editing && initialData?.imageUrl && (
                        <>
                            <Pencil className='w-4 h-4 mr-3' />
                            Edit IMAGES
                        </>
                    )}
                </Button>

                
            </div>



            {!editing && (
                !initialData?.imageUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-400 rounded-md'>
                        <ImageIcon className='text-white h-20 w-20' />
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-60 bg-slate-400'>
                        <Image
                            width={700}
                            height={200}
                            src={initialData?.imageUrl}
                            alt="image"
                            className='h-full w-full object-cover'
                        />
                    </div>
                )
            )}

            {editing && (
                <div>
                    <FileUpload
                        endpoint='courseImag'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default ImageForm
