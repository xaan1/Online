
import React from 'react'
import Logow from './Logow'
import SidbarRouter from './SidbarRouter'



const Sidbar = () => {


  return (

    <div className='h-full border-r flex flex-col bg-white shadow-sm
    
    overflow-y-auto
    '>

 <div className='p-6 pl-20' >
     <Logow />
   


 </div>



 <div className='flex flex-col  h-full'>
  <SidbarRouter />

</div>




     



    </div> 
  )


}

export default Sidbar