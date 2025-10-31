import React, { Suspense } from 'react'
import Checkout from './Checkout'

const page = () => {
  return (
     <Suspense fallback={<div>Loading...</div>}>
        <Checkout/>
     </Suspense>
  )
}

export default page