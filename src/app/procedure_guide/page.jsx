import React, { Suspense } from 'react'
import ProcedureGuide from './ProcedureGuide'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <ProcedureGuide />
    </Suspense>
  )
}

export default page