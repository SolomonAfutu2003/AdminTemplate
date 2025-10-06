import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'
import Footer from '../components/Footer'



const AdminLayout = () => {

    return (
        <div className='flex'>
            <SideNav />
            <div className='flex-1 flex flex-col '>
                <TopNav />
                <main className="bg-gray-100 flex-1 overflow-auto">
                    <div className='p-5'><Outlet /></div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout