import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";

const StatsEditor = () => {
    const [dataTitle, setDataTitle] = useState("");
    const [dataCount, setDataCount] = useState("");
    const [dataPercent, setDataPercent] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("statsSection");
        if (saved) {
            const { dataTitle, dataCount, dataPercent } = JSON.parse(saved);
            setDataTitle(dataTitle);
            setDataCount(dataCount);
            setDataPercent(dataPercent);
        }
    }, []);

    useEffect(() => {
        const sectionData = { dataTitle, dataCount, dataPercent };
        localStorage.setItem("statsSection", JSON.stringify(sectionData));
    }, [dataTitle, dataCount, dataPercent]);

    return (
        <div>
            <label className="block">
                <span className="text-sm text-gray-600">Heading</span>
                <input
                    type="text"
                    value={dataTitle}
                    onChange={(e) => setDataTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </label>
            <label className="block">
                <span className="text-sm text-gray-600">Heading</span>
                <input
                    type="text"
                    value={dataCount}
                    onChange={(e) => setDataCount(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </label>
            <label className="block">
                <span className="text-sm text-gray-600">Heading</span>
                <input
                    type="text"
                    value={dataPercent}
                    onChange={(e) => setDataPercent(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </label>

            {/* Subheading (rich text editor)
            <label className="block">
                <span className="text-sm text-gray-600">Subheading</span>
                <Editor content={subheading} onChange={setSubheading} />
            </label> */}
        </div>
    )
}

export default StatsEditor