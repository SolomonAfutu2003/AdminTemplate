import React, { useState, useEffect } from 'react'
import Btn from './Btn'

const ClientFoot = () => {
    const latestData = [
        { news: "Trial of Chairman Wontumi Over Akonta Mining Set to Begin Tuesday" },
        { news: "Mahama Awards UDS $85,000 for Historic World University Football Victory" },
        { news: "National Service Cancels June Registrations, Sets New Enrollment for October 8" },
        { news: "Mass Surrender as Task Force Raids Illegal mining sites in Western Region" },
    ]

    const News = [
        { category: "Presidential" },
        { category: "Business" },
        { category: " Technology" },
        { category: "Health" },
    ]
    const Links = [
        { link: "About" },
        { link: "Carrer" },
        { link: "Account" },
        { link: "Privacy Policy" },
    ]

    const [visibility, setVisibility] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("cmsVisibility");
        if (saved) {
            setVisibility(JSON.parse(saved));
        }
    }, []);

    return (
        <>
            {visibility.footer && (
                <div className='bg-black text-white flex justify-between p-5'>
                    <section className='flex w-[30%]'>
                        <div className='space-y-5'>
                            <h3>Latest Topics</h3>
                            <ul className="flex flex-col gap-5">
                                {latestData.map((data, idx) => ((
                                    <li className='text-sm w-[80%]' key={idx}>
                                        {data.news}
                                    </li>
                                )))}
                            </ul>
                        </div>
                        <div className='space-y-5'>
                            <h3>The News</h3>
                            <ul className="flex flex-col gap-5">
                                {News.map((data, idx) => ((
                                    <li key={idx}>
                                        {data.category}
                                    </li>
                                )))}
                            </ul>
                        </div>
                    </section>
                    <section>
                        <div className='space-y-5'>
                            <h3>Quick Links</h3>
                            <ul className="flex flex-col gap-5">
                                {Links.map((data, idx) => ((
                                    <li key={idx}>
                                        {data.link}
                                    </li>
                                )))}
                            </ul>
                        </div>
                    </section>
                    <section className='space-y-3 w-[40%]'>
                        <h3 className='text-3xl font-bold'>Keep up to date with the latest updates & news</h3>
                        <div className='flex items-center'>
                            <input type="email" name="" id="" placeholder='Your email' className='border border-gray-400 outline-0 rounded-l-lg px-4 py-2' />
                            <Btn text={"Sign Up"} style={"bg-red-500 rounded-r-lg px-4 py-2"} />
                        </div>
                        <p>By pressing the Signup button, you confirm that you have read and are agreeing to our Privacy Policy and Terms of Use</p>
                    </section>
                </div>)}
        </>
    )
}

export default ClientFoot