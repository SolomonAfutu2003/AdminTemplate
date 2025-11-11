import React, { useEffect, useState } from "react";
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
import { Check, EllipsisVertical, MoveRight, XIcon, ChevronDown } from 'lucide-react';
import profile from "../../assets/Image1.jpg"
// import Header from '../../components/sections/Post';
import Stats from '../../components/sections/Stats';
import SemiCircleLoadBar from '../../components/SemiCircleLoadBar';
import Btn from '../../components/Btn';
// import { getVisibleBlogs } from "../../api";
import blogApi from "../../API/blogAPI";



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
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await blogApi.getAll();
                setTotalPosts(res.data.length); // assuming your API returns an array
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
        scales: {
            x: {
                grid: {
                    display: false, // removes vertical grid lines
                },
            },
            y: {
                grid: {
                    display: false, // removes horizontal grid lines
                },
            },
        },
    };

    const DiscussionsData = [
        {
            id: 1,
            rank: "01",
            title: "John Doe on Hello World!- 3 days ago",
            discussion: "Well, the way they make shows is, they make one show ..."
        },
        {
            id: 2,
            rank: "02",
            title: "John Doe on Hello World!- 3 days ago",
            discussion: "Well, the way they make shows is, they make one show ..."
        },
        {
            id: 3,
            rank: "03",
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

    const header = ({
        heading: "Dashboard",
        subheading: "Blog Overview",
    });

    // const [stats, setStats] = useState({
    //     dataTitle: "Posts",
    //     dataCount: 2000,
    //     dataPercent: 4.50,
    // });

    // useEffect(() => {
    //     const saved = localStorage.getItem("headerSection");
    //     if (saved) {
    //         setHeader(JSON.parse(saved));
    //     }
    // }, []);

    // useEffect(() => {
    //     const saved = localStorage.getItem("statsSection");
    //     if (saved) {
    //         setStats(JSON.parse(saved));
    //     }
    // }, []);

    return (
        <div className='space-y-5'>
            <header>
                <h3 className='text-gray-400'>{header.heading}</h3>
                <h4 className='text-3xl text-gray-700 font-bold'>{header.subheading}</h4>
            </header>
            <main className='space-y-5'>
                <section className='grid grid-cols-4 gap-5'>
                    <Stats
                        dataTitle="Total Posts"
                        dataCount={loading ? "..." : totalPosts}
                        text="View Posts"
                        icon={<MoveRight size={15} />}
                        linkStyle="flex items-center gap-2"
                        style="space-y-6"
                    />
                    <Stats dataTitle={"Total Views"} dataCount={0} text={"View Report"} icon={<MoveRight size={15} />} linkStyle={"flex items-center gap-2"} style={"space-y-6"} />
                    <Stats dataTitle={"Total Comments"} dataCount={0} text={"View Comments"} icon={<MoveRight size={15} />} linkStyle={"flex items-center gap-2"} style={"space-y-6"} />
                    <Stats dataTitle={"Quarter Post Review"} loader={<SemiCircleLoadBar />} style={"text-center space-y-3"} text={"Review"} icon={<MoveRight size={15} />} linkStyle={"flex justify-center items-center gap-2"} />
                </section>
                <section className="flex gap-4">
                    <section className='w-[50%] space-y-5'>
                        <div className='bg-white rounded-lg shadow-[#00000038] shadow-lg w-full h-80 p-6 space-y-5'>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-black font-bold'>Blogs Chart</h3>
                                <div className='flex justify-between gap-5 text-[11px] font-medium'>
                                    <p>CURRENT MONTH</p>
                                    <p>PAST MONTH</p>
                                </div>
                            </div>
                            <div className='h-50'>
                                <Line data={data} options={options} />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='bg-white p-3 rounded-lg shadow-[#00000038] shadow-lg space-y-4'>
                                <h3 className="text-gray-400 text-base font-semibold">Top month</h3>
                                <div>
                                    <p className='text-orange-900 text-2xl font-semibold'>November</p>
                                    <p>2019</p>
                                </div>
                            </div>
                            <div className='bg-white p-3 rounded-lg shadow-[#00000038] shadow-lg space-y-4'>
                                <h3 className="text-gray-400 text-base font-semibold">Top month</h3>
                                <div>
                                    <p className='text-orange-900 text-2xl font-semibold'>November</p>
                                    <p>2019</p>
                                </div>
                            </div>
                            <div className='bg-white p-3 rounded-lg shadow-[#00000038] shadow-lg space-y-4'>
                                <h3 className="text-gray-400 text-base font-semibold">Top month</h3>
                                <div>
                                    <p>November</p>
                                    <p>2019</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="bg-white flex flex-col rounded-lg shadow-[#00000038] shadow-lg w-[50%] p-6 space-y-5 h-full">
                        <div className='flex justify-between'>
                            <h3 className='text-xl font-semibold'>Post Rankings</h3>
                            <Btn text={"Sort by Newest"} icon={<ChevronDown />} style={"flex flex-row-reverse items-center"} />
                        </div>
                        <div className='h-[320px]'>
                            <table className='w-[100%]'>
                                <thead>
                                    <tr>
                                        <th className='w-[20%] text-left text-gray-600 text-xs font-medium py-4'>Rank</th>
                                        <th className='w-[60%] text-left text-gray-600 text-xs font-medium py-4'>Post Title</th>
                                        <th className='w-[20%] text-left text-gray-600 text-xs font-medium py-4'>Views</th>
                                    </tr>
                                </thead>
                                {DiscussionsData.map((post) => (
                                    <tbody key={post.id}>
                                        <tr>
                                            <td className='py-4 text-sm font-medium'>{post.rank}</td>
                                            <td className='py-4 text-xs font-medium'>
                                                <div className='flex gap-3'>
                                                    <div className='w-8 h-8'><img src={profile} alt="" className='w-full h-full object-cover' /></div>
                                                    <div className='flex flex-col'>
                                                        <p>{post.title}</p>
                                                        <p>{post.discussion}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-4'>$8,000</td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        <div>
                            <LinkBtn text={"View All"} icon={<MoveRight />} className={"text-orange-700 flex items-center gap-1"} />
                        </div>
                    </div>
                </section>
            </main>
        </div >
    )
}

export default BlogDashboard