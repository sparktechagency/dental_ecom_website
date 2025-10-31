import React, { Suspense } from 'react'
import CongratulationsContent from './CongratulationsContent'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CongratulationsContent />
    </Suspense>
  )
}

export default page