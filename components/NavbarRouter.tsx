 'use client'
import React from 'react'
import { useAuth, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import SeacrInbut from './modals/SeacrInbut'
import { UserProgress } from '@prisma/client';
import { isTeacher } from '@/lib/teacher'


const NavbarRouter = () => {


  const pathname= usePathname()

  const router = useRouter()

  const {userId} = useAuth()

  const isTeacherPage = pathname?.startsWith("/teacher")
  // playerPage

  const isPlayerPage =   pathname?.includes("/courses")

  const isSearchPage =   pathname === "/search"



  return (
    <>

    {

      isSearchPage && (
        <div className='hidden md:block'>
          <SeacrInbut />

         


        </div>
      )
    
    }

    

<div className='flex gap-x-2  ml-auto'>
       
      {
       isTeacherPage  || isPlayerPage ? (
   
   
         <Link href="/" >
           <Button size="sm"  variant="ghost" >
             
           <LogOut 
   
   
   className='h-4 w-4 mr-2' />
   Exit
           </Button>
   
   
   
         </Link>
         
         
       
       )  :
       isTeacher(userId) ?
   
       (
         <Button size="sm"  variant="ghost" onClick={() => router.push("/teacher")}>
           Teacher Mode 
         </Button>
       ) 
       : null
      }
    
   
   
   
     <UserButton 
   
     afterSignOutUrl='/'
     
     />
   
       </div>
    </>
 
  )
}

export default NavbarRouter