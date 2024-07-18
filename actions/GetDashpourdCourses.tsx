import db from "@/lib/db"
import { Category, Chapter, Course } from "@prisma/client"
import { Award } from "lucide-react"
import getProgress from "./Getprogress"




type CourseProgressWithCategory = Course & { 
    category : Category
    chapters : Chapter[]
    progress : number | null

}


type DahpurdCourses = {

    completedCourses : CourseProgressWithCategory[]
    coursesInProgress : CourseProgressWithCategory[]
    
}

export const GetDashpourdCourses =async (userId: string) : Promise<DahpurdCourses> => {







     try {


        const purcahseCourse = await db.purchase.findMany({
            where : {
                userId : userId
            },
            select : {
                course : {
                    include : {
                        category : true,
                        chapters : {
                            where : {
                                isPublished : true
                            }
                        }
                    }
                }
            }
            
        })




       

        const courses = purcahseCourse.map(
            (purchase) => purchase.course
          ) as CourseProgressWithCategory[];
      
          for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
          }
      
          const completedCourses = courses.filter(
            (course) => course.progress === 100
          );
      
          const coursesInProgress = courses.filter(
            (course) => (course.progress ?? 0) < 100
          );
      
          return { completedCourses, coursesInProgress };

       

 


     }  catch(e){
            console.error(e ,"error in GetDashpourdCourses")
            return {
                completedCourses : [],
                coursesInProgress : []
            }
     }

    








}