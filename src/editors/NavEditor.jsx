// editors/NavEditor.jsx
import { Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
// import { iconMap } from "../utils/iconMap";

const NavEditor = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("navLinks");
        if (saved && JSON.parse(saved).length > 0) {
            setLinks(JSON.parse(saved));
        } else {
            const defaults = [
                { to: "/home", text: "Home", icon: "" },
            ];
            setLinks(defaults);
            localStorage.setItem("navLinks", JSON.stringify(defaults)); // save defaults
        }
    }, []);

    useEffect(() => {
        if (links.length > 0) {
            localStorage.setItem("navLinks", JSON.stringify(links));
        }
    }, [links]);

    const updateLink = (index, field, value) => {
        const updated = [...links];
        updated[index][field] = value;
        setLinks(updated);
    };

    const addLink = () => {
        setLinks([
            ...links,
            { to: "/new", text: "New Link", icon: "" }, // default new item
        ]);
    };

    const removeLink = (index) => {
        const updated = links.filter((_, i) => i !== index);
        setLinks(updated);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-bold">Edit Navigation</h2>

            {links.map((link, i) => (
                <div key={i} className="space-y-2 p-2 rounded relative">
                    <label htmlFor="">Link Text </label>
                    <input
                        type="text"
                        value={link.text}
                        onChange={(e) => updateLink(i, "text", e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Link Text"
                    />


                    <label htmlFor=""> Route Path</label>
                    <input
                        type="text"
                        value={link.to}
                        onChange={(e) => updateLink(i, "to", e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Route Path"
                    />


                    {/* Remove button */}
                    <button
                        onClick={() => removeLink(i)}
                        className="absolute top-2 right-2 text-red-500"
                    >
                        <Trash />
                    </button>
                </div>
            ))}

            {/* Add new link button */}
            <button
                onClick={addLink}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                ➕ Add New Link
            </button>
        </div>
    );
};

export default NavEditor;
