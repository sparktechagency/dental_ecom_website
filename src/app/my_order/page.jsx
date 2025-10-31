import React, { Suspense } from 'react'
import AllOrder from './AllOrder'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <AllOrder/>
    </Suspense>
  )
}

export default page