import React, { Suspense } from 'react'
import CheckoutSuccessContent from './CheckoutSuccessContent'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent/>
    </Suspense>
  )
}

export default page