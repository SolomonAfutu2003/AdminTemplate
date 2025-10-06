import React, { useState, useEffect } from "react";

const sections = [
  { id: "header", label: "Header" },
  { id: "navbar", label: "Navbar" },
  { id: "footer", label: "Footer" },
  { id: "stats", label: "Stats Section" },
  { id: "blog", label: "Blog Section" },
];

const VisibilityEditor = () => {
  const [visibility, setVisibility] = useState({});

  // Load visibility from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cmsVisibility");
    if (saved) {
      setVisibility(JSON.parse(saved));
    } else {
      // Default: all visible
      const initialState = sections.reduce((acc, sec) => {
        acc[sec.id] = true;
        return acc;
      }, {});
      setVisibility(initialState);
    }
  }, []);

  // Save whenever visibility changes
  useEffect(() => {
    localStorage.setItem("cmsVisibility", JSON.stringify(visibility));
  }, [visibility]);

  // Toggle handler
  const toggleVisibility = (id) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[400px] space-y-3">
      <h2 className="text-lg font-semibold mb-2">🔧 Section Visibility</h2>
      {sections.map((sec) => (
        <div key={sec.id} className="flex justify-between items-center border-b py-2">
          <span>{sec.label}</span>
          <button
            onClick={() => toggleVisibility(sec.id)}
            className={`px-3 py-1 rounded ${
              visibility[sec.id]
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {visibility[sec.id] ? "Visible" : "Hidden"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VisibilityEditor;