import { GetDashpourdCourses } from "@/actions/GetDashpourdCourses";
import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation';
import CoursesList from "../search/_components/CoursesList";
import InfoCard from "./_components/InfoCard";
import { CheckCircle, Clock } from "lucide-react";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "LMS Platform |",
  description: "LMS Platform by Next.js ",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function Dashboard() {


  const {userId} = auth()

  if(!userId) {
    return redirect("/search")
  }
  


  const {completedCourses , coursesInProgress} =  await GetDashpourdCourses(userId)

  console.log(completedCourses ,"completedCourses")
  console.log(coursesInProgress ,"coursesInProgress")

  




  return (

    <div className="p-6 space-y-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>

      <CoursesList items={[...coursesInProgress , ...completedCourses]} />
 


   
    </div>

   
  )
}
