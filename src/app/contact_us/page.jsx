import React, { Suspense } from 'react'
import ContactUs from './ContactUs'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <ContactUs />
    </Suspense>
  )
}

export default page