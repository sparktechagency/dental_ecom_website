import React from 'react'
import { BiSolidPackage } from 'react-icons/bi'
import { FaClock } from 'react-icons/fa'
import { IoShieldCheckmarkSharp } from 'react-icons/io5'
import { MdLocalShipping } from 'react-icons/md'

const FreeShipping = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex  gap-24 justify-center items-center py-12 flex-wrap'>
            <div className='flex text-center gap-4 text-black items-center
            font-semibold text-base
            ' >
                <MdLocalShipping />
                <p>Free Shipping</p>
            </div>
            <div className='flex text-center gap-4 text-black items-center
            font-semibold text-base
            ' >
                <IoShieldCheckmarkSharp />
                <p>100% Secure Payment</p>
            </div>
            <div className='flex text-center gap-4 text-black items-center
            font-semibold text-base
            ' >
               <FaClock />
                <p>24/7 Support</p>
            </div>
            <div className='flex text-center gap-4 text-black items-center
            font-semibold text-base
            ' >
                <BiSolidPackage />
                <p>24hr Delivery*</p>
            </div>
        </div>
    </div>
  )
}

export default FreeShipping