import React from 'react'

function Submit({value}) {
  return (
    <input
    className="px-4 py-2 w-24 flex justify-center items-center mx-auto bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-stone-50 transition-colors duration-300"
    type="submit"
    value={value}
  />
  )
}

export default Submit