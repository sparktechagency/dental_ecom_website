import React, { Suspense } from 'react'
import TermsAndCondition from './TermsAndCondition'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <TermsAndCondition/>
    </Suspense>
  )
}

export default page