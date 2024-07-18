
import React from 'react'

const layout = ({children}  :{children : React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center mt-20 p-10'>
        {children}
    </div>
  )
}

export default layout