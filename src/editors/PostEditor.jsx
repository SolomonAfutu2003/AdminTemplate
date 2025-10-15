import React, { useState, useEffect } from "react";
import Editor from "../components/Editor";

const PostEditor = () => {
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [image, setImage] = useState("");
  const [layout, setLayout] = useState("image-top"); // default layout

  useEffect(() => {
    const saved = localStorage.getItem("headerSection");
    if (saved) {
      const { heading, subheading, image, layout } = JSON.parse(saved);
      setHeading(heading || "");
      setSubheading(subheading || "");
      setImage(image || "");
      setLayout(layout || "image-top");
    }
  }, []);

  useEffect(() => {
    const sectionData = { heading, subheading, image, layout };
    localStorage.setItem("headerSection", JSON.stringify(sectionData));
  }, [heading, subheading, image, layout]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Heading */}
      <label className="block">
        <span className="text-sm text-gray-600">Heading</span>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </label>

      {/* Subheading */}
      <label className="block">
        <span className="text-sm text-gray-600">Subheading</span>
        <Editor content={subheading} onChange={setSubheading} />
      </label>

      {/* Image Upload */}
      <label className="block">
        <span className="text-sm text-gray-600">Header Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block mt-1"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-2 w-48 h-32 object-cover rounded-lg shadow"
          />
        )}
      </label>

      {/* Layout Selector */}
      <label className="block">
        <span className="text-sm text-gray-600">Design Format</span>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="image-top">🖼️ Image Top</option>
          <option value="image-left">↔️ Image Left, Text Right</option>
          <option value="image-right">↔️ Image Right, Text Left</option>
          <option value="text-only">📝 Text Only</option>
        </select>
      </label>
    </div>
  );
};

export default PostEditor;
