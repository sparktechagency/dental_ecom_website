import React, { Suspense } from 'react'
import SignUp from './SignUp'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <SignUp/>
    </Suspense>
  )
}

export default page