 "use client"
import React, { useState } from 'react'
import MuxPlayer from "@mux/mux-player-react";

import { Loader2, Lock } from "lucide-react";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import toast from 'react-hot-toast';


interface VedipPlayerProps {
    chapterId : string,
    coursoID : string,
    title : string,
    nextChapteriD : string,
    isLocked : boolean,
    
    completEndOne : boolean,
    plybackId : string

}

const VedipPlayer = ({chapterId ,coursoID , title , nextChapteriD ,  isLocked ,completEndOne , plybackId } :VedipPlayerProps) => {

    const [isReady, setIsReady] = useState(false);

    const router = useRouter()

    const confetti = useConfettiStore()

    const onEnd = async () => {
      try {
        if (completEndOne) {
          await axios.put(
            `/api/courses/${coursoID}/chapters/${chapterId}/progress`,
            {
              isCompleted: true,
            }
          );
  
          if (!nextChapteriD) {
            confetti.onOpen();
          }
  
          toast.success("Chapter completed successfully");
          router.refresh();
  
          if (nextChapteriD) {
            router.push(`/courses/${coursoID}/chapters/${nextChapteriD}`);
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
  
  return (
    <div className="relative aspect-video">
    { !isReady && !isLocked && (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    )}
    {isLocked && (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
        <Lock className="w-8 h-8" />
        <p className="text-sm">
          This chapter is locked. Purchase it to unlock it.
        </p>
      </div>
    )}
    {!isLocked && (
      <MuxPlayer
        title={title}
        playbackId={plybackId}
        className={cn(!isReady && "hidden")}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnd}
        autoPlay
      />
    )}
  </div>
  )
}

export default VedipPlayer