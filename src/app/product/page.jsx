import React, { Suspense } from 'react'
import Product from './Product'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <Product/>
    </Suspense>
  )
}

export default page