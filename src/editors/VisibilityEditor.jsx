import React, { useState, useEffect } from "react";
import Switch from "../components/Switch";

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
    <div className="p-4 space-y-6">
     <div> <h2 className="text-4xl font-bold mb-2">🔧 Section Visibility</h2></div>
      <div className="grid grid-cols-3 gap-4">
        {sections.map((sec) => (
          <div key={sec.id} className="bg-white flex justify-between items-center py-6 px-4 rounded-lg">
            <span className="text-2xl font-bold">{sec.label}</span>
            <Switch
              checked={visibility[sec.id]}
              onChange={() => toggleVisibility(sec.id)}
            />
            <span className={`ml-2 text-base font-medium ${visibility[sec.id] ? "text-green-500" : "text-red-500"}`}>
              {visibility[sec.id] ? "Visible" : "Hidden"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisibilityEditor;