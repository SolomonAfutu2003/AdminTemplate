import React, { useEffect, useState } from "react";
import { Bold, Italic, Heading1, Heading2, LetterText } from "lucide-react";

const EditorMenu = ({ editor }) => {
  // local state just to force re-renders
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const forceUpdate = () => setTick((t) => t + 1);

    // subscribe to events that matter
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

  const btnClass = (active) =>
    `${active ? "bg-gray-300 px-2 py-1 rounded" : "px-2 py-1"} focus:outline-none`;

  const fonts = ["Inter", "Arial", "Times New Roman", "Courier New", "Georgia"];

  return (
    <div className="flex gap-2 border-b border-gray-200 p-2 bg-white">
      <button
        onMouseDown={(e) => {
          e.preventDefault(); // prevent the button from blurring the editor
          editor.chain().focus().toggleBold().run();
        }}
        className={btnClass(editor.isActive("bold"))}
        aria-pressed={editor.isActive("bold")}
        title="Bold"
      >
        <Bold size={16} />
      </button>

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={btnClass(editor.isActive("italic"))}
        aria-pressed={editor.isActive("italic")}
        title="Italic"
      >
        <Italic size={16} />
      </button>

      <select
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        value={editor.getAttributes("textStyle").fontFamily || ""}
        className="border p-1 rounded"
      >
        <option value="">Default</option>
        {fonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={btnClass(editor.isActive("heading", { level: 1 }))}
        title="H1"
      >
        <Heading1 size={16} />
      </button>

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
        title="H2"
      >
        <Heading2 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Toggle bullet list
      </button>
    </div>
  );
};

export default EditorMenu;
