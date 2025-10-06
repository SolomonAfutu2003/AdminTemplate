import React, { useEffect, useState } from 'react'
import Header from '../../components/sections/Header'
import Btn from '../../components/Btn';
import LinkBtn from '../../components/LinkBtn';

const Home = () => {
    const [header, setHeader] = useState({
        heading: "Dashboard",
        subheading: "Blog Overview",
    });
    useEffect(() => {
        const saved = localStorage.getItem("headerSection");
        if (saved) {
            setHeader(JSON.parse(saved));
        }
    }, []);
    return (
        <div>
            <section className='bg-blue-300 h-[500px] flex flex-col justify-center items-center space-y-3'>
                <Header heading={header.heading} subheading={header.subheading} />
                <div className='flex justify-center items-center gap-4'>
                    <Btn text={"Start Building"} style={"bg-blue-400 text-white rounded-lg px-4 py-2"} />
                    <Btn text={"Start Building"} style={"bg-blue-400 text-white rounded-lg px-4 py-2"} />
                </div>
            </section>
            <section className=' h-[500px] p-5'>
                <div className='flex justify-between'>
                    <h3 className='font-bold text-2xl'>From Our blog</h3>
                    <LinkBtn text={"view more post"} className={"text-blue-500"} />
                </div>
            </section>
        </div>
    )
}

export default Home