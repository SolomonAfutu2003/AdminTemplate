import React, { useState, useEffect } from "react";

const sections = [
  { id: "header", label: "Header" },
  { id: "navbar", label: "Navbar" },
  { id: "footer", label: "Footer" },
  { id: "button", label: "Button" },
  { id: "blog", label: "Blog Section" },
  { id: "latest", label: "Latest" },
  { id: "trending", label: "Trending" },
  { id: "national", label: "National" },
];

const VisibilityEditor = () => {
  const [visibility, setVisibility] = useState({});

  // Load visibility from localStorage
useEffect(() => {
  const saved = localStorage.getItem("cmsVisibility");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      // If it's empty or invalid, reset to all visible
      const hasKeys = Object.keys(parsed).length > 0;

      if (hasKeys) {
        // Merge saved data with any new sections
        const merged = sections.reduce((acc, sec) => {
          acc[sec.id] = parsed[sec.id] ?? true; // default to visible
          return acc;
        }, {});
        setVisibility(merged);
      } else {
        throw new Error("Empty data");
      }
    } catch {
      const initialState = sections.reduce((acc, sec) => {
        acc[sec.id] = true;
        return acc;
      }, {});
      setVisibility(initialState);
    }
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