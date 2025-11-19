import React, { useState, useEffect } from 'react'
import Btn from './Btn'
import visibilityApi from '../API/visibilityAPI'

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
    const [loading, setLoading] = useState(true);

    // Fetch visibility from API
    useEffect(() => {
        const fetchVisibility = async () => {
            try {
                setLoading(true);
                const res = await visibilityApi.getAll();
                const dbSections = res.data;

                // Convert array to object for easy access
                const visibilityObj = {};
                dbSections.forEach(item => {
                    visibilityObj[item.name] = item.isVisible;
                });

                setVisibility(visibilityObj);
            } catch (err) {
                console.error("Error fetching footer visibility:", err);
                // Default to visible if API fails
                setVisibility({ footer: true });
            } finally {
                setLoading(false);
            }
        };

        fetchVisibility();
    }, []);

    if (loading) {
        return <div className="bg-black text-white p-5 text-center">Loading footer...</div>;
    }

    return (
        <>
            {visibility.footer && (
                <div className='bg-black text-white flex justify-between p-5'>
                    <section className='flex w-[30%]'>
                        <div className='space-y-5'>
                            <h3 className="text-lg font-semibold">Latest Topics</h3>
                            <ul className="flex flex-col gap-3">
                                {latestData.map((data, idx) => (
                                    <li className='text-sm w-[80%] hover:text-gray-300 cursor-pointer transition-colors' key={idx}>
                                        {data.news}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='space-y-5 ml-8'>
                            <h3 className="text-lg font-semibold">The News</h3>
                            <ul className="flex flex-col gap-3">
                                {News.map((data, idx) => (
                                    <li key={idx} className='hover:text-gray-300 cursor-pointer transition-colors'>
                                        {data.category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section>
                        <div className='space-y-5'>
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="flex flex-col gap-3">
                                {Links.map((data, idx) => (
                                    <li key={idx} className='hover:text-gray-300 cursor-pointer transition-colors'>
                                        {data.link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    <section className='space-y-3 w-[40%]'>
                        <h3 className='text-2xl font-bold'>Keep up to date with the latest updates & news</h3>
                        <div className='flex items-center'>
                            <input 
                                type="email" 
                                placeholder='Your email' 
                                className='border border-gray-400 outline-0 rounded-l-lg px-4 py-2 flex-1 text-black' 
                            />
                            <Btn 
                                text={"Sign Up"} 
                                style={"bg-red-500 hover:bg-red-600 rounded-r-lg px-4 py-2 transition-colors"} 
                            />
                        </div>
                        <p className='text-sm text-gray-300'>
                            By pressing the Signup button, you confirm that you have read and are agreeing to our Privacy Policy and Terms of Use
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default ClientFoot