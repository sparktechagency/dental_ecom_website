import React, { Suspense } from 'react'
import EditProfile from './EditProfile'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <EditProfile/>
    </Suspense>
  )
}

export default page