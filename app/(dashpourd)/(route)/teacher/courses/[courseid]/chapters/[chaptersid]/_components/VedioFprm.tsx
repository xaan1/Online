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
import { ImageIcon, Pencil, PlusCircle, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from "@/components/ui/textarea"
import { Chapter, Course, MuxData } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';
import MuxPlayer from "@mux/mux-player-react";

interface VedioFprm {
    initialData: Chapter & {muxData? : MuxData | null};
    courseID: string;
    chapterId : string,
}

const formsShema = z.object({
    vedioUrl: z.string().min(1, {
        message: "vedioUrl is required",
    }),
});

const VedioFprm = ({ initialData, courseID , chapterId }: VedioFprm) => {

    const [editing, setEditing] = useState(false);

    const toggleEditing = () => setEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formsShema>>({
        resolver: zodResolver(formsShema),
        defaultValues: {
            vedioUrl: initialData?.vedioUrl || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formsShema>) => {
        console.log(values);

        try {
            const data = await axios.patch(`/api/courses/${courseID}/chapters/${chapterId}`, values);
            console.log(data, "vedioUrl/vedioUrl")
            console.log(data, "data")
            toast.success('Course Updated vedioUrl  successfully')
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

                    {!editing && !initialData?.vedioUrl && (
                        <>
                            <PlusCircle className='mr-2' />
                            <h3>Add vedio</h3>
                        </>
                    )}
                    
                    {!editing && initialData?.vedioUrl && (
                        <>
                            <Pencil className='w-4 h-4 mr-3' />
                            Edit vedioUrl
                        </>
                    )}
                </Button>

                
            </div>

            {!editing && (
                !initialData?.vedioUrl ? (
                    <div className='flex items-center justify-center h-60 bg-slate-400'>
                        <VideoIcon className='text-white h-20 w-20' />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                    <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
                  </div>
                )
            )}

            {editing && (
                <div>
                    <FileUpload
                        endpoint='courseVideo'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ vedioUrl: url })
                            }
                        }}
                    />
                </div>
            )}

            {
                initialData.vedioUrl && !editing && (
                    <div className='text-2xl text-white'>
                        Vedio can Take Minute refresh a Page
                        </div>
                )
            }
        </div>
    )
}

export default VedioFprm
