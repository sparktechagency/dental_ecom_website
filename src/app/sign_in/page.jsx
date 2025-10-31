import React, { Suspense } from 'react'
import LogIn from './LogIn'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <LogIn/>
    </Suspense>
  )
}

export default page