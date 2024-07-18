
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/db'



const Coursespage = async() => {



  const {userId} = auth()

  if(!userId){
    return redirect('/sign-in')
  }



  const courses = await db.course.findMany({
    where:{
      userId: userId
    },
    orderBy : {
      createdAt: 'desc'
    
    }
  })




  return (
  <div>

 <DataTable  columns={columns}  data={courses}  />

    


    </div>
  )
}

export default Coursespage