import React from 'react'
import NavEditor from '../../editors/NavEditor'
import LogoEditor from '../../editors/LogoEditor'


const NavigationMenu = () => {
    return (
        <div className='space-y-5'>
            <h2 className="text-4xl font-bold">Edit Navigation</h2>
            <section className='flex flex-col lg:flex-row gap-5'>
                <div className='w-full lg:w-[60%]'><NavEditor /></div>
                <div className='w-full lg:w-[40%] h-full'><LogoEditor /></div>
            </section>
        </div>
    )
}

export default NavigationMenu