import Image from 'next/image'
import React from 'react'
import image from "/public/cards.png"
import { FaCcVisa } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcApplePay } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";





const PaymentCards = () => {
  return (
    <div className='container mx-auto'>
        <div className='flex justify-center flex-col items-center py-12 gap-5'>
             <p className='text-2xl font-semibold text-black'>Accepted Payment Methods</p>
             {/* <Image
             src={image}
             height={100}
             width={100}
             className='w-[200px] '
            
             /> */}

           <div className='grid grid-cols-3 gap-12 pt-8'>
           <div> <FaCcVisa className="text-5xl text-black"/> </div>
             <div> <SiAmericanexpress  className="text-5xl text-black"/> </div>
             <div> <FaCcApplePay   className="text-5xl text-black"/> </div>
             <div> <FaCcPaypal    className="text-5xl text-black"/> </div>
             <div> <FaCcMastercard     className="text-5xl text-black"/> </div>
             <div> <FaGooglePay      className="text-5xl text-black"/> </div>
           </div>
        </div>
     </div>
  )
}

export default PaymentCards