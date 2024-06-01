import React from 'react'
import Nav from '../pages/shared/Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/shared/footer/Footer'
function MainLayout() {
  return (
    <div>
        <Nav/>
       <div className='min-h-[calc(100vh-360px)]'>
       <Outlet/>
       </div>
        <Footer/>
    
        
    </div>
  )
}

export default MainLayout