import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'
// import { BulletList } from '@tiptap/extension-list'
import EditorMenu from "./EditorMenu";
import { Calendar, Eye, Flag, Glasses, Save } from 'lucide-react'
import Btn from '../components/Btn'

const PostEditor = () => {
    const [title, setTitle] = useState("");
    // const [savedContent, setSavedContent] = useState("");

    const editor = useEditor({
        extensions: [StarterKit,
            TextStyle, FontFamily.configure({
                types: ['textStyle'],
            }),
            Placeholder.configure({
                placeholder: "Start writing your content here...",
            }),
        ],
        content: ""
    });

    const handleSave = () => {
        if (!editor) return;

        const html = editor.getHTML();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract structured fields
        const h1 = doc.querySelector("h1");
        const h2 = doc.querySelector("h2");
        const firstP = doc.querySelector("p");

        const title = h1 ? h1.textContent : "Untitled Post";
        const subtitle = h2 ? h2.textContent : "";
        const excerpt = firstP ? firstP.textContent.slice(0, 150) : ""; // trim for preview

        // Remove extracted elements from final content
        if (h1) h1.remove();
        if (h2) h2.remove();

        const body = doc.body.innerHTML;

        const newPost = {
            category: "Technology", // or dynamic from user input
            title,
            subtitle,
            excerpt,
            content: body,  // 👈 rich text body
            bg: "bg-purple-400 text-white",
            date: new Date().toLocaleDateString(),
        };

        const existing = JSON.parse(localStorage.getItem("posts")) || [];
        localStorage.setItem("posts", JSON.stringify([newPost, ...existing]));
    };


    return (
        <div className="space-y-4 flex gap-4">
            <section className="bg-white w-[75%] h-full rounded-lg space-y-4 p-4">
                {/* Title input */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full border border-gray-200 outline-0 rounded p-2 text-base"
                />

                {/* Editor */}
                <div className="border border-gray-200 rounded h-[400px]">
                    <EditorMenu editor={editor} />
                    <div className="p-2 text-gray-500">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save Post
                </button> */}

                {/* Preview after save */}
                {/* {savedContent && (
                    <div className="border rounded p-3 bg-gray-50 mt-4">
                        <h3 className="font-semibold mb-2">📌 Preview:</h3>
                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: savedContent }} />
                    </div>
                )} */}
            </section>

            <section className='flex flex-col gap-3 w-[25%]'>
                <div className='bg-white rounded-lg'>
                    <div className='border-b border-b-gray-300 py-4 px-2'>
                        <h3 className='text-gray-600'>Users Overview</h3>
                    </div>
                    <div className='p-3'>
                        <ul className='space-y-3'>
                            <li className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Flag size={15} />
                                    <p>Status: <span>Draft</span></p>
                                </div>
                                <Btn text={"Edit"} />
                            </li>
                            <li className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Eye size={15} />
                                    <p>Visibility: <span>Draft</span></p>
                                </div>
                                <Btn text={"Edit"} />
                            </li>
                            <li className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Calendar size={15} />
                                    <p>Schedule: <span>Draft</span></p>
                                </div>
                                <Btn text={"Edit"} />
                            </li>
                            <li className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Glasses size={15} />
                                    <p>Status: <span>Draft</span></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='flex justify-between border-t border-t-gray-300 py-3 px-4 '>
                        <Btn text={"Save Draft"} style={"border border-blue-500 px-3 py-2 text-blue-500 text-sm flex items-center gap-1"} icon={<Save size={15} />} />
                        <Btn text={"Publish"}  onClick={handleSave} style={"bg-blue-500 px-3 py-2 text-white text-sm flex items-center gap-1"} icon={<Save size={15} />} />
                    </div>
                </div>

                <div className='bg-white rounded-lg'>
                    <div className='border-b border-b-gray-300 py-4 px-2'>
                        <h3 className='text-gray-600'>Categories</h3>
                    </div>
                    <div className="p-3">
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <input id="check1" type="checkbox" className="w-5 h-5 accent-blue-500" />
                                <label htmlFor="check1" className="ml-2">Check</label>
                            </li>
                            <li className="flex items-center">
                                <input id="check2" type="checkbox" className="w-5 h-5 accent-blue-500" />
                                <label htmlFor="check2" className="ml-2">Check list</label>
                            </li>
                            <li className="flex items-center">
                                <input id="check3" type="checkbox" className="w-5 h-5 accent-blue-500" />
                                <label htmlFor="check3" className="ml-2">Check list</label>
                            </li>
                            <li className="flex items-center">
                                <input id="check4" type="checkbox" className="w-5 h-5 accent-blue-500" />
                                <label htmlFor="check4" className="ml-2">Check list</label>
                            </li>
                            <li className="flex items-center">
                                <input id="check5" type="checkbox" className="w-5 h-5 accent-blue-500" />
                                <label htmlFor="check5" className="ml-2">Check list</label>
                            </li>
                        </ul>
                    </div>
                    <div className='flex gap-3 border-t border-t-gray-300 py-4 px-2'>
                        <Btn text={"Save Draft"} style={"border border-blue-500 px-3 py-2 text-blue-500 text-sm flex items-center gap-1"} icon={<Save size={15} />} />
                        <Btn text={"Publish"} style={"bg-blue-500 px-3 py-2 text-white text-sm flex items-center gap-1"} icon={<Save size={15} />} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostEditor;