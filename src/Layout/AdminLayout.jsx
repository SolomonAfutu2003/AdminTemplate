import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav'
import SideNav from '../components/SideNav'
import Footer from '../components/Footer'

const AdminLayout = () => {
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <SideNav />
            <div className='flex-1 flex flex-col lg:ml-0'>
                <TopNav />
                <main className="flex-1 overflow-auto p-5">
                    <div className='max-w-7xl mx-auto w-full'>
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout