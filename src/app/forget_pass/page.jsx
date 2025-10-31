import React, { Suspense } from 'react'
import ForgetPassword from './ForgetPassword'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <ForgetPassword />
    </Suspense>
  )
}

export default page