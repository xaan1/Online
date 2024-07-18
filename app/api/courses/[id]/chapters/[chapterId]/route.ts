import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(req: Request, { params }: { params: { id: string; chapterId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isPublished, ...values } = await req.json();

    console.log("Received request data:", values);

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });
    

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
      data: {
        ...values,
      },
    });



    if (values.vedioUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.vedioUrl,
        playback_policy: ["public", "signed"],
        test: false,
      }).catch(error => {
        console.error("Mux asset creation error:", error);
        throw error;
      });

      await db.muxData.create({
        data: {
          assetId: asset.id,
          chapterId: params.chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_ID,ChapterId]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}






//  delete cahpter route



export async function DELETE(req: Request, { params }: { params: { id: string; chapterId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }



    const chapter =  await db.chapter.findUnique({
      where : {
        id : params.chapterId,
        courseId : params.id
      }
    })


    if(!chapter){
      return new NextResponse("Chapter not found", { status: 404 });
    }


    if(chapter.vedioUrl){

      const muxData = await db.muxData.findFirst({
        where : {
          chapterId : params.chapterId
        }
      })

      if(muxData){
        await video.assets.delete(muxData.assetId)
        await db.muxData.delete({
          where: {
            id: muxData.id,
          },
        });
       
       
      }
    }

  
  

    const DeleteChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
        courseId: params.id,
      },
    });


    const publishedChapter =  await db.chapter.findMany({
      where : {
        courseId : params.id,
        isPublished : true
      }
    
    })

    if(!publishedChapter.length){
      await db.course.update({
        where : {
          id : params.id
        },
        data : {
          isPublished : false
        }
      })
    }

    return NextResponse.json(DeleteChapter);
  } catch (error) {
    console.log("[cahpterID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}