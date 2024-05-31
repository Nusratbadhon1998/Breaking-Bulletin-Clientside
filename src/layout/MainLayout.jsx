import React from 'react'
import Nav from '../pages/shared/Nav/Nav'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <Nav/>
        <Outlet/>
    
        
    </div>
  )
}

export default MainLayout