import React, { Suspense } from 'react'
import ChangePassword from './ChangePassword'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <ChangePassword/>
    </Suspense>
  )
}

export default page