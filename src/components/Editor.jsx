import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "<p>Start typing...</p>",
        onUpdate: ({ editor }) => {
            onChange && onChange(editor.getHTML());
        },
    });

    return (
        <div className="border border-gray-300 rounded-lg p-2 min-h-[150px] focus-within:border-blue-500">
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor