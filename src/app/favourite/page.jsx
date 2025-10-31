import React, { Suspense } from 'react'
import Favorite from './Favorite'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Favorite/>
    </Suspense>
  )
}

export default page