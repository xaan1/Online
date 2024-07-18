"use client"


import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable ,   DropResult, } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { Badge, Grid, Pencil } from 'lucide-react';

interface ChapterListProps {

    items : Chapter[],
    onReorder : (updateData : {id : string, position : number}[]) => void,
    onEdit : (id : string) => void,

}

const ChapterList = ({
    items,
    onReorder,
    onEdit
}: ChapterListProps) => {




 const [ isMounted  , setIsMounted] = useState(false)


 const [ chapters  , setChapter] = useState(items)


 useEffect(() => {

setIsMounted(true)

 } ,[])

 



 useEffect(() => {

    setChapter(items)

 } , [items])

 const onDragEnd = (result:   DropResult,) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapter(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };


  if(!isMounted) {
    return null
 }


    return (
       
        <DragDropContext 
         onDragEnd={onDragEnd}>

            <Droppable droppableId='chapters'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>

                        {chapters.map((chapter, index) => (
                            <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                                {(provided) => (
                                    <div className={cn("flex items-center gab-x-6 border-slate-400 border text-slate-400 rounded mb-4 text-sm"  , chapter.isPublished && "bg-slate-100 border-sky-300"  )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className={cn("px-2 py-2 border-r-slate-400 hover:bg-slate-300 rounded-sm transition-all" , chapter.isPublished && "border-r-sky-300 hover:bg-slate-200" )}>
                                           <Grid className='h-5 w-5' />
                                        </div>
                                        {
                                            chapter.title
                                        
                                        }
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                       {chapter.isFree && <Badge>Free</Badge>}
                         <Badge
                       className={cn(
                        "bg-slate-500",
                        chapter.isPublished && "bg-sky-700"
                      )}>
                      
                        
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(chapter.id)}
                      />
                    </div>
                    </div>
                
                             
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        
        




        </DragDropContext>

    )



}


export default ChapterList