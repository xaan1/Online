

import React from 'react'
import Image from 'next/image'
import SidbarRouter from './SidbarRouter'

const Logow = () => {
  return (
    <div className='w-full'>

      <div>
        
      <Image src="/logo.svg" alt="logo" className='w-10 h-10'  
      width={20}
      height={20}
      />
      </div>
      
      
    </div>
  )
}

export default Logow