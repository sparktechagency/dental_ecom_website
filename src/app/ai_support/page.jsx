import React, { Suspense } from 'react'
import AiSupport from './AiSupport'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <AiSupport />
    </Suspense>
  )
}

export default page