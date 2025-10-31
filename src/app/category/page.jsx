import React, { Suspense } from 'react'
import CategoryContent from './CategoryContent'

const page = () => {
  return (
    <Suspense>
      <CategoryContent/>
    </Suspense>
  )
}

export default page