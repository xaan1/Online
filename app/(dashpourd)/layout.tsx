
import React from 'react'
import Sidbar from './_components/Sidbar'
import Navbar from './_components/Navbar'

const Dashpourdlayout = ({children}  :{children : React.ReactNode}) => {
  return (
    <div className='h-full'>


   <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>

   <Navbar /> 

    </div> 

        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>

       <Sidbar />

        </div>

        

        <main className='md:pl-60  pt-[90px]'>


        {children}
        </main>
    
    </div>

  )
}

export default Dashpourdlayout