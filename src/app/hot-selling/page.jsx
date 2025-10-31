import React, { Suspense } from 'react'
import AllHotSelling from './AllHotSelling'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <AllHotSelling />
    </Suspense>
  )
}

export default page