import Image from 'next/image'
import React from 'react'

import imagefirst from "../../../public/visaa.png"
import american from "../../../public/american.png"
import visa from "../../../public/vissa.png"
import applepay from "../../../public/apple_pay.png"
import maestro from "../../../public/maestro.png"
import master from "../../../public/master.png"





const PaymentCards = () => {
  return (
    <div className='container mx-auto'>
        <div
         data-aos="fade-up"
       data-aos-duration="800"
        className='flex justify-center flex-col items-center py-12 gap-5'>
             <p className='text-2xl font-semibold text-black'>Accepted Payment Methods</p>
            

           <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12 pt-8'>
           <div className=' w-12 md:w-24 lg:w-32'> 
            <Image
            
            src={imagefirst}/>
             </div>
             <div className='w-12 md:w-24 lg:w-32 '> <Image 
             className='w-24'
             src={american}/> </div>
             <div className='w-12 md:w-24 lg:w-32 '> <Image src={visa}/> </div>
             <div className='w-12 md:w-24 lg:w-32 '> <Image src={applepay}/> </div>
          
             <div className='w-12 md:w-24 lg:w-32 '> <Image src={maestro}/> </div>
             <div className='w-12 md:w-24 lg:w-32 '> <Image src={master}/> </div>
           


          
           </div>
        </div>
     </div>
  )
}

export default PaymentCards