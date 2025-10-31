import React, { Suspense } from 'react'
import ShoppingCart from './ShoppingCart'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <ShoppingCart/>
    </Suspense>
  )
}

export default page