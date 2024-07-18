
import React from 'react'
import MopilSidbar from './MopilSidbar'
import NavbarRouter from '@/components/NavbarRouter'

const Navbar = () => {
  return (
    <div className='h-full flex items-center  p-4  bg-white shadow-sm '>
    <MopilSidbar />

    <NavbarRouter />
    </div>
  )
}

export default Navbar