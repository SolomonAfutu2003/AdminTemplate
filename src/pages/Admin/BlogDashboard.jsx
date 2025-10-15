import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import LinkBtn from '../../components/LinkBtn';
import { Check, EllipsisVertical, MoveRight, XIcon } from 'lucide-react';
import profile from "../../assets/Image1.jpg"
import Header from '../../components/sections/Post';
import Stats from '../../components/sections/Stats';


// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


const BlogDashboard = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Sales",
                data: [10, 20, 15, 30, 25],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: false, text: "Monthly Sales" },
        },
    };

    const pieData = {
        labels: ["10", "20"],
        datasets: [
            {
                data: [10, 20], // ✅ your values here
                backgroundColor: [
                    "rgba(34,197,94,0.8)", // green
                    "rgba(239,68,68,0.8)", // red
                ],
                borderWidth: 0,
            },
        ],
    }

    const pieOption = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                },
            },
        },
    }

    const DiscussionsData = [
        {
            title: "John Doe on Hello World!- 3 days ago",
            discussion: "Well, the way they make shows is, they make one show ..."
        },
        {
            title: "John Doe on Hello World!- 3 days ago",
            discussion: "Well, the way they make shows is, they make one show ..."
        },
        {
            title: "John Doe on Hello World!- 3 days ago",
            discussion: "Well, the way they make shows is, they make one show ..."
        },

    ]

    const ReferralsData = [
        {
            name: "GitHub",
            number: 19291,
        },
        {
            name: "GitHub",
            number: 19291,
        },
        {
            name: "GitHub",
            number: 19291,
        },
        {
            name: "GitHub",
            number: 19291,
        },
        {
            name: "GitHub",
            number: 19291,
        }
    ]

    const [header, setHeader] = useState({
        heading: "Dashboard",
        subheading: "Blog Overview",
    });

    const [stats, setStats] = useState({
        dataTitle: "Posts",
        dataCount: 2000,
        dataPercent: 4.50,
    });

    // useEffect(() => {
    //     const saved = localStorage.getItem("headerSection");
    //     if (saved) {
    //         setHeader(JSON.parse(saved));
    //     }
    // }, []);

    useEffect(() => {
        const saved = localStorage.getItem("statsSection");
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    return (
        <div className='space-y-5'>
            <header>
                <h3 className='text-gray-400'>{header.heading}</h3>
                <h4 className='text-3xl text-gray-700 font-bold'>{header.subheading}</h4>
            </header>
            <main className='space-y-5'>
                <Stats dataTitle={stats.dataTitle} dataCount={stats.dataCount} dataPercent={stats.dataPercent} />
                <section className='w-full flex gap-5'>
                    <div className='bg-white rounded-lg shadow-[#00000038] shadow-lg w-[70%]'>
                        <div className='border-b border-b-gray-300 py-4 px-2'>
                            <h3 className='text-gray-600'>Users Overview</h3>
                        </div>
                        <div className='bg-gray-100 py-2 px-3 border-b border-b-gray-300 flex justify-end'>
                            <LinkBtn text={"View full Report"} icon={<MoveRight size={15} />} className={"flex items-center gap-3 border border-gray-400 py-2 px-4 text-xs rounded-lg"} />
                        </div>
                        <div className='h-50 p-4'>
                            <Line data={data} options={options} />
                        </div>
                    </div>

                    <div className='bg-white rounded-lg shadow-[#00000038] shadow-lg w-[30%]'>
                        <div className='border-b border-b-gray-300 py-4 px-2'>
                            <h3 className='text-gray-600'>Users Overview</h3>
                        </div>
                        <div className='flex justify-center items-center p-6'>
                            <div className='w-[190px] h-[190px]'>
                                <Pie data={pieData} options={pieOption} />
                            </div>
                        </div>
                        <div className='py-2 px-3 border-t border-t-gray-300 flex justify-end'>
                            <LinkBtn text={"View full Report"} icon={<MoveRight size={15} />} className={"flex items-center gap-3 py-2 px-4 text-xs rounded-lg"} />
                        </div>
                    </div>
                </section>
                <section className="flex gap-4">
                    <div className="bg-white flex flex-col rounded-lg shadow-[#00000038] shadow-lg w-[30%] h-full">
                        <div className='border-b border-b-gray-300 py-4 px-2'>
                            <h3 className='text-gray-800'>Users Overview</h3>
                        </div>
                        <div className='flex flex-col space-y-4 px-3 py-3'>
                            <input type="search" name="" id="" placeholder='Brave New World' className='border border-gray-300 p-2 rounded-lg transition delay-150 duration-200 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100' />
                            <textarea name="" id="" className='border border-gray-300 h-80 rounded-lg p-2 transition delay-150 duration-200 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100' placeholder='Words'></textarea>
                        </div>
                        <div className='flex justify-start pb-2 px-3'>
                            <button className='bg-blue-600 text-white px-3 py-2 rounded-lg'>Create Draft</button>
                        </div>
                    </div>

                    <div className="bg-white flex flex-col rounded-lg shadow-[#00000038] shadow-lg w-[45%] h-full">
                        <div className='border-b border-b-gray-300 py-4 px-2'>
                            <h3 className='text-gray-800'>Discussions</h3>
                        </div>
                        <div>
                            {DiscussionsData.map((data, idx) => (
                                <ul key={idx}>
                                    <li className='flex gap-3 p-3 border-b border-b-gray-400'>
                                        <div className='w-12 h-12' >
                                            <img className="w-full h-full" src={profile} alt="" />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3>{data.title}</h3>
                                            <p> {data.discussion}</p>
                                            <div className='flex'>
                                                <button className='flex items-center gap-1 text-gray-600 border border-r-0 border-gray-300 rounded-l-lg py-1 px-4 hover:shadow-lg hover:shadow-gray-300 transition ease-in-out duration-200 delay-100'><Check color='green' size={15} /> Approve</button>
                                                <button className='flex items-center gap-1 text-gray-600 border border-gray-300 py-1 px-4 hover:shadow-lg hover:shadow-gray-300 transition ease-in-out duration-200 delay-100'><XIcon color='red' size={15} /> Reject</button>
                                                <button className='flex items-center gap-1 text-gray-600 border border-l-0 border-gray-300 rounded-r-lg py-1 px-4 hover:shadow-lg hover:shadow-gray-300 transition ease-in-out duration-200 delay-100'><EllipsisVertical size={15} /> Edit</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className='flex justify-center items-center p-3'>
                            <button className='border border-gray-400 text-gray-600 px-2 py-1 rounded-lg'>View All Comments</button>
                        </div>
                    </div>

                    <div className="bg-white flex flex-col rounded-lg shadow-[#00000038] shadow-lg w-[25%] h-full">
                        <div className='border-b border-b-gray-300 py-4 px-2'>
                            <h3 className='text-gray-800'>Top Referrals</h3>
                        </div>
                        <div className='flex flex-col'>
                            {ReferralsData.map((data, idx) => (
                                <ul key={idx}>
                                    <li className='flex justify-between border-b border-b-gray-400 px-2 py-3 text-gray-600'>
                                        <h3>{data.name}</h3>
                                        <p> {data.number}</p>
                                    </li>
                                </ul>
                            ))}
                        </div>
                        <div className='flex justify-end p-3'>
                            <LinkBtn text={"Full report"} icon={<MoveRight size={15} />} className={"flex items-center gap-3 py-2 px-4 text-xs rounded-lg"} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default BlogDashboard