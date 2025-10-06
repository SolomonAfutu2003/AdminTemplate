import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Btn from "./Btn";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const Navbar = () => {
    const [links, setLinks] = useState([]);
    const [isActive, setIsActive] = useState(false)

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

    useEffect(() => {
        const saved = localStorage.getItem("navLinks");
        if (saved) {
            setLinks(JSON.parse(saved));
        }
    }, []);

    const [visibility, setVisibility] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("cmsVisibility");
        if (saved) {
            setVisibility(JSON.parse(saved));
        }
    }, []);

    const handleMenu = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <div className="sticky top-0 bg-white flex flex-col shadow-lg">
            {visibility.navbar !== false && <Navbar />}
            <section className="min-h-20 px-10 flex justify-between items-center relative">
                <div>
                    <h2>Logo</h2>
                </div>
                {visibility.navbar !== false && (
                    <div className="relative">
                        {/* Top Navigation Buttons */}
                        <div className="flex gap-3">
                            <Btn
                                text={"Latest"}
                                onClick={handleMenu}
                                icon={isActive ? <ChevronUp /> : <ChevronDown />}
                                style={
                                    "flex font-bold text-2xl flex-row-reverse items-center gap-2"
                                }
                            />
                            <Btn
                                text={"Trending"}
                                icon={<ChevronDown />}
                                style={
                                    "flex font-bold text-2xl flex-row-reverse items-center gap-2"
                                }
                            />
                            <Btn
                                text={"National"}
                                icon={<ChevronDown />}
                                style={
                                    "flex font-bold text-2xl flex-row-reverse items-center gap-2"
                                }
                            />
                        </div>

                        {isActive && (
                            <section className="bg-white w-[90%] absolute -bottom-32 left-20 right-20 p-6 flex gap-3 shadow-lg rounded-lg">
                                <div className="bg-gray-100 w-[20%] rounded-md p-3">
                                    <ul className="flex flex-col items-start gap-2">
                                        {PostData.map((post, idx) => (
                                            <li key={idx} className="hover:text-blue-600 cursor-pointer">
                                                {post.category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-100 w-[80%] rounded-md p-3">
                                    <ul className="grid grid-cols-3 gap-3">
                                        {PostData.map((post, idx) => (
                                            <li
                                                key={idx}
                                                className="p-3 bg-white rounded shadow-sm hover:shadow-md transition"
                                            >
                                                <h3 className="font-semibold">{post.title}</h3>
                                                <p className="text-sm text-gray-600">{post.category}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-5">
                    <Search />
                    <Btn text={"Subscribe"} style={"bg-red-500 rounded-lg px-4 py-2 text-white"} />
                </div>
            </section>
            <section className="bg-red-500">
                <ul className="flex">
                    {links.map((link, i) => (
                        <li key={i}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `py-3 px-5 text-sm flex items-center gap-2 
                    ${isActive ? "text-blue-600 border-l-4 border-l-blue-600 font-bold" : "text-white font-bold"}`
                                }
                            >
                                <span>{link.icon}</span>
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Navbar