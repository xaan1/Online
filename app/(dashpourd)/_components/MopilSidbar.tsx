
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import React from 'react'
import Sidbar from "./Sidbar"
import { Menu } from "lucide-react"

const MopilSidbar = () => {
  return (
 
        <Sheet >
  <SheetTrigger className="md:hidden pr-4 hover:opacity-75 border-0 transition">
  
  <Menu className="w-10 "/>
  
  </SheetTrigger>
  <SheetContent side="left">
    <Sidbar/>
  </SheetContent>
</Sheet>

  )
}

export default MopilSidbar