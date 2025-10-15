// EditorMenu.jsx
import React, { useEffect, useState, useRef } from "react";
import { Bold, Italic, Heading1, List, Image as ImageIcon } from "lucide-react";

const EditorMenu = ({ editor }) => {
  const [, setTick] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editor) return;
    const forceUpdate = () => setTick((t) => t + 1);

    editor.on("update", forceUpdate);
    editor.on("selectionUpdate", forceUpdate);
    editor.on("focus", forceUpdate);
    editor.on("blur", forceUpdate);

    return () => {
      editor.off("update", forceUpdate);
      editor.off("selectionUpdate", forceUpdate);
      editor.off("focus", forceUpdate);
      editor.off("blur", forceUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  const fonts = ["", "Inter", "Arial", "Times New Roman", "Courier New", "Georgia"];

  // Add image from file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  // Add image from URL
  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 p-2 bg-gray-50 rounded-t-md">
      {/* Text styling buttons */}
      <button
        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
        className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"}`}
      >
        <Bold size={16} />
      </button>

      <button
        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
        className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"}`}
      >
        <Italic size={16} />
      </button>

      <button
        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }}
        className={`px-2 py-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"}`}
      >
        <Heading1 size={16} />
      </button>

      <button
        onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
        className={`px-2 py-1 rounded ${editor.isActive("bulletList") ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"}`}
      >
        <List size={16} />
      </button>

      {/* Font selector */}
      <select
        className="border p-1 rounded"
        value={editor.getAttributes("textStyle").fontFamily || ""}
        onChange={(e) => {
          const font = e.target.value || null;
          editor.chain().focus().setMark("textStyle", { fontFamily: font }).run();
        }}
      >
        {fonts.map((f) => (
          <option key={f || "default"} value={f}>
            {f === "" ? "Default" : f}
          </option>
        ))}
      </select>

      {/* 🖼️ Image upload */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          fileInputRef.current.click();
        }}
        className="px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
        title="Upload image"
      >
        <ImageIcon size={16} />
        Upload
      </button>

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          handleAddImageUrl();
        }}
        className="px-2 py-1 rounded hover:bg-gray-100"
        title="Insert image by URL"
      >
        🌐
      </button>

      {/* Hidden input for file upload */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default EditorMenu;
