import React, { useState, useEffect } from "react";

const LogoEditor = () => {
  const [image, setImage] = useState("");

  // ✅ Load saved image
  useEffect(() => {
    const saved = localStorage.getItem("logoSection");
    if (saved) {
      const { image } = JSON.parse(saved);
      setImage(image || "");
    }
  }, []);

  // ✅ Save whenever it changes
  useEffect(() => {
    const sectionData = { image };
    localStorage.setItem("logoSection", JSON.stringify(sectionData));
  }, [image]);

  // ✅ Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded-lg bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Logo Editor</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-3"
      />
      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full shadow"
        />
      )}
    </div>
  );
};

export default LogoEditor;
