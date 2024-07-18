'use client'
import React from 'react'
import {BarChart, Compass  , Layout, List} from "lucide-react"
import SidbarItem from './SidbarItem'
import { usePathname } from 'next/navigation'


const guestRoutes = [

    {
        icon : Layout,
        Label : 'Dashboard',
        href : '/',
    },

    {
        icon : Compass,
        Label : 'Browser',
        href : '/search',
    }
]



const teacherRouter = [

  {
    icon : List,
    Label : 'Courses',
    href : '/teacher/courses'

  }

   ,

   {
    icon : BarChart,
    Label : 'Analytics',
    href : '/teacher/analytic'

  }


]


const SidbarRouter = () => {



  const pathname =  usePathname()

  // console.log(pathname , "pathname") 


  const isTeacherPage = pathname.startsWith("/teacher")






    const router  =  isTeacherPage  ?  teacherRouter : guestRoutes

  return (
    <div className='flex-flex-col w-full mt-8 h-full'>
  {
        router.map((route, index) => (
            
            <SidbarItem

            key={index}
            icon={route.icon}
            Label={route.Label}
            href={route.href}
            
            
            />

        ))
            
  }

    </div>
  )
}

export default SidbarRouter