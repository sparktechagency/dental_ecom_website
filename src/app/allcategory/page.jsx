import React, { Suspense } from 'react'
import AllCategory from './AllCategory'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllCategory />
    </Suspense>
  )
}

export default page