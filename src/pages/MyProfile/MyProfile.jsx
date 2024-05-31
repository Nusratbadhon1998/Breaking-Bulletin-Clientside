import React from 'react'
import useAuth from '../../hooks/useAuth'

function MyProfile() {
    const {user}= useAuth()
  return (
    <div>MyProfile: {user?.displayName}</div>
  )
}

export default MyProfile