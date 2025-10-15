import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ClientFoot from '../components/ClientFoot'


const ClientLayout = () => {

  return (
    <div >
      <Navbar />
      <Outlet />
      <ClientFoot />
    </div>
  )
}

export default ClientLayout