import React, { useEffect, useState } from 'react'
import Header from '../../components/sections/Post'
// import Btn from '../../components/Btn';
// import LinkBtn from '../../components/LinkBtn';
import Post from '../../components/sections/Post'

const Home = () => {
    const PostData = [
        {
            category: "Technology",
            title: "Conduct at an replied removal an amongst",
            text: "However venture pursuit he am mr cordial...",
            bg: "bg-red-400 text-white",
            date: "28 February 2019"
        },
        {
            category: "Presidential",
            title: "Conduct at an replied removal an amongst",
            text: "However venture pursuit he am mr cordial...",
            bg: "bg-blue-400 text-white",
            date: "28 February 2019"
        },
        {
            category: "Health",
            title: "Conduct at an replied removal an amongst",
            text: "However venture pursuit he am mr cordial...",
            bg: "bg-green-400 text-white",
            date: "28 February 2019"
        },
        {
            category: "Business",
            title: "Conduct at an replied removal an amongst",
            text: "However venture pursuit he am mr cordial...",
            bg: "bg-amber-400 text-white",
            date: "28 February 2019"
        }
    ]

    const [header, setHeader] = useState({
        heading: "Dashboard",
        subheading: "Blog Overview",
        image: "",
        layout: "",
    });
    useEffect(() => {
        const saved = localStorage.getItem("headerSection");
        if (saved) {
            setHeader(JSON.parse(saved));
        }
    }, []);
    return (
        <div className='p-6 space-y-3'>
            {/* <Header /> */}
            <div className='flex gap-5'>
                <section className='w-[70%]'>
                    {/* <Header  layout={header.layout} /> */}
                    <div>
                        <article>
                            <Post heading={header.heading} image={header.image} subheading={header.subheading} layout={header.layout} />
                            {/* The International Monetary Fund has voiced support for Ghana's ongoing fiscal reforms, stating that recent policy measures are likely to promote long-term fiscal discipline beyond the country's current bailout program, which ends in May 2026.
                            Speaking at a press briefing in Washington, IMF Director of Communications Julie Kozack highlighted several reforms that the Fund believes will serve as durable safeguards for macroeconomic stability, even after Ghana's formal engagement with the IMF concludes.
                            “These reforms include a revamped fiscal responsibility framework, the creation of an independent fiscal council, and improvements in public financial management systems to enhance the efficiency of public spending,” Kozack said.
                            Key among the reforms is the adoption of binding fiscal rules. The framework mandates a primary fiscal surplus of at least 1.5% of GDP annually and sets a public debt ceiling at 45% of GDP. According to the IMF, these targets are intended to serve as firm policy anchors to guide future governments and reduce the risk of fiscal slippage.
                            “This framework provides critical guidance to policymakers as they work to entrench fiscal discipline in Ghana,” Kozack added.
                            Ghana's government has publicly committed to maintaining these reforms beyond the life of the program, in a bid to restore investor confidence and reassure international markets of its fiscal credibility. The country has faced repeated debt challenges over the past decade, culminating in a restructuring deal under the IMF's Extended Credit Facility launched in 2023.
                            Meanwhile, an IMF team led by mission chief Ruben Atoyan has arrived in Accra for the fifth review of Ghana's performance under the program. The delegation is scheduled to meet with officials from the Ministry of Finance and the Bank of Ghana over a two-week period. */}
                            {/* The review comes at a pivotal time as the country seeks to maintain macroeconomic gains while navigating continued inflationary pressures and external financing constraints. */}
                        </article>
                    </div>
                </section>
                <section className='space-y-6 w-[30%]'>
                    <div className='bg-gray-200'>
                        <ul>
                            {PostData.map((data, idx) => (
                                <li
                                    key={idx}
                                    className="p-3"
                                >
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-gray-600">{data.category}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='bg-gray-200'>
                        <ul>
                            {PostData.map((data, idx) => (
                                <li
                                    key={idx}
                                    className="p-3"
                                >
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-gray-600">{data.category}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home