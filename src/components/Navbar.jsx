import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import tabApi from "../API/tabAPI";
import Btn from "./Btn";
import { Search } from "lucide-react";
import Logo from "./sections/Logo";

const Navbar = () => {
    const [tabs, setTabs] = useState([]);
    // const [isActive, setIsActive] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const res = await tabApi.getAll();
                setTabs(res.data.filter((tab) => !tab.isDeleted));
            } catch (err) {
                console.error("Error fetching tabs:", err);
            }
        };
        fetchTabs();

        const savedLogo = localStorage.getItem("logoSection");
        if (savedLogo) setImage(JSON.parse(savedLogo).image || "");
    }, []);

    return (
        <div className="sticky z-10 top-0 bg-white flex flex-col shadow-lg">
            <section className="min-h-20 py-3 px-10 flex justify-between items-center relative">
                {image && <Logo image={image} />}

                <div className="flex items-center gap-5">
                    <Search />
                    <Btn
                        text={"Subscribe"}
                        style={"bg-red-500 rounded-lg px-4 py-2 text-white"}
                    />
                </div>
            </section>

            <section className="bg-red-500">
                <ul className="flex">
                    <li>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `py-3 px-5 text-sm flex items-center gap-2 
                  ${isActive
                                    ? "text-blue-600 border-l-4 border-l-blue-600 font-bold"
                                    : "text-white font-bold"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {tabs.map((link) => (
                        link.isVisible && (<li key={link.id}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `py-3 px-5 text-sm flex items-center gap-2 
                  ${isActive
                                        ? "text-blue-600 border-l-4 border-l-blue-600 font-bold"
                                        : "text-white font-bold"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>)
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Navbar;
