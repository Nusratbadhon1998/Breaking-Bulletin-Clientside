import React from 'react'
import { HashLoader } from 'react-spinners'

function LoadingSpinner() {
  return (
    <div
    className="h-[250px]
    flex 
    flex-col 
    justify-center 
    items-center"
  >
    <HashLoader size={100} color='black' />
  </div>
  )
}

export default LoadingSpinner