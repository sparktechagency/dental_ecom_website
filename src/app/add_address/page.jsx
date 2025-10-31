import React, { Suspense } from 'react'
import AddNewAddress from './AddAddress'

const page = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}> 
        <AddNewAddress></AddNewAddress>
        </Suspense>
    </div>
  )
}

export default page