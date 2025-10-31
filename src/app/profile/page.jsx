import React, { Suspense } from 'react'
import ProfilePage from './ProfilePage'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <ProfilePage/>
    </Suspense>
  )
}

export default page