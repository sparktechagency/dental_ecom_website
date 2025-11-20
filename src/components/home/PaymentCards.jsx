import Image from 'next/image'
import React from 'react'
import image from "/public/cards.png"

const PaymentCards = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-center flex-col items-center py-12 gap-5'>
             <p className='text-2xl font-semibold text-black'>Accepted Payment Methods</p>
             <Image
             src={image}
             height={100}
             width={100}
             className='w-[200px] '
            
             />
        </div>
     </div>
  )
}

export default PaymentCards