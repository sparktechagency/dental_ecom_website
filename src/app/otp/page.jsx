import React, { Suspense } from 'react'
import Otp from './Otp'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <Otp/>
    </Suspense>
  )
}

export default page