import { Bell, ChevronDown, File, Logs, Search, Settings, User2 } from 'lucide-react'
import React, { useState } from 'react'
import profile from "../assets/Image1.jpg"
import Btn from './Btn'
import { useAuth } from "../context/AuthContext";


const TopNav = () => {
    const [dopeDown, setDopeDown] = useState(false)

    const { logout } = useAuth();

    const handleDopeDown = () => {
        setDopeDown((prev) => !prev);
    }

    return (
        <div className='bg-white h-16 sticky top-0 shadow-[#00000015] shadow-lg flex items-center z-20'>
            <div className='h-full w-[90%] flex items-center px-3 relative text-gray-400'>
                <input type="search" name="" id="" placeholder='Search for something...' className='outline-0 px-6 w-full' />
                <Search size={17} className='absolute' />
            </div>
            <div className='border-x w-[5%] flex items-center justify-center h-full text-gray-400'>
                <Bell />
            </div>
            <div className='flex items-center gap-3 h-full px-2 text-gray-400 relative' onClick={handleDopeDown}>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <img src={profile} alt="" className='w-full h-full object-cover' />
                </div>
                <div className='flex items-center' >
                    <p>Solomon</p>
                    <ChevronDown size={20} />
                </div>

                {dopeDown && (
                    <section className='absolute top-16 right-0 bg-white shadow-lg  w-full border border-gray-100'>
                        <ul className='p-2 space-y-3'>
                            <li className='flex gap-2 items-center'><User2 size={15} />Profile</li>
                            <li className='flex gap-2 items-center'><Settings size={15} />Edit profile</li>
                            <li className='flex gap-2 items-center'><File size={15} />File</li>
                            <li className='flex gap-2 items-center'><Logs size={15} />Transactions</li>
                        </ul>
                        <div className='border-t p-3 flex justify-center'>
                            <Btn onClick={logout} text={"Logout"} style={"text-red-500"} />
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default TopNav