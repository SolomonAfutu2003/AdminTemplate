import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";

const HeaderEditor = () => {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");

  // Load existing draft (if any)
  useEffect(() => {
    const saved = localStorage.getItem("headerSection");
    if (saved) {
      const { heading, subheading } = JSON.parse(saved);
      setHeading(heading);
      setSubheading(subheading);
    }
  }, []);

  // Save instantly when changed
  useEffect(() => {
    const sectionData = { heading, subheading };
    localStorage.setItem("headerSection", JSON.stringify(sectionData));
  }, [heading, subheading]);

  return (
    <div className="space-y-4">
      {/* Heading (plain text) */}
      <label className="block">
        <span className="text-sm text-gray-600">Heading</span>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </label>

      {/* Subheading (rich text editor) */}
      <label className="block">
        <span className="text-sm text-gray-600">Subheading</span>
        <Editor content={subheading} onChange={setSubheading} />
      </label>
    </div>
  );
};

export default HeaderEditor;
