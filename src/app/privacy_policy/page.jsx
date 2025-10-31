import React, { Suspense } from 'react'
import PrivacyPolicy from './PrivacyPolicy'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <PrivacyPolicy/>
    </Suspense>
  )
}

export default page