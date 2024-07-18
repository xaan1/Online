import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";

const f = createUploadthing();



const HandleAuth = () => {
  const { userId } = auth();
  const IsAuthrized = isTeacher(userId)

  if (!userId || !IsAuthrized) throw new Error("An Authorized user is required");

  return { userId };
}





export const ourFileRouter = {

  
  courseImag: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {}),
    
  courseAttachment: f(['text', 'image', 'video', 'audio', 'pdf'])
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {}),
    
  courseVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => HandleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
