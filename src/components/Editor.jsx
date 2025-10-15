import React from 'react'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'
import EditorMenu from './EditorMenu';
import Image from '@tiptap/extension-image';

const Editor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit,
            TextStyle, FontFamily.configure({
                types: ['textStyle'],
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: content || "<p>Start typing...</p>",
        onUpdate: ({ editor }) => {
            onChange && onChange(editor.getHTML());
        },
    });

    return (
        <div className="border border-gray-300 rounded-lg p-2 min-h-[150px] focus-within:border-blue-500">
            <EditorMenu editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor