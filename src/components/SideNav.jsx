import React from 'react'
import LinkBtn from './LinkBtn'
import { AlertOctagon, Columns3, FilePlus, Notebook, Pencil, Table2, User2 } from 'lucide-react'


const SideNav = () => {

    return (
        <div className='h-screen w-56 bg-white sticky top-0 left-0 z-30 shadow-lg shadow-[#0000003f]'>
            <div className='p-5 border-b border-b-gray-400'>
                <h2>Logo</h2>
            </div>
            <ul>
                <li>
                    <LinkBtn
                        to="/"
                        text="Blog Dashboard"
                        icon={<Pencil size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />                </li>
                <li>
                    <LinkBtn
                        to="/blog_posts"
                        text="Blog Posts"
                        icon={<Notebook size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/add_new_post"
                        text="Add New Post"
                        icon={<FilePlus size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/user_profile"
                        text="User Profile"
                        icon={<User2 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/nav_editor"
                        text="Nav Editor"
                        icon={<User2 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/header_editor"
                        text="Header Editor"
                        icon={<User2 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/visibility_editor"
                        text="visibility_editor"
                        icon={<User2 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                {/* <li>
                    <LinkBtn
                        to="/forms_and_components"
                        text="Forms And Components"
                        icon={<Columns3 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
                <li>
                    <LinkBtn
                        to="/tables"
                        text="Tables"
                        icon={<Table2 size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li>
               
                <li>
                    <LinkBtn
                        to="/errors"
                        text="Errors"
                        icon={<AlertOctagon size={15} />}
                        className={({ isActive }) =>
                            `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-2 justify-end items-center ${isActive
                                ? "border-l-4 border-l-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-blue-600"
                            }`
                        }
                    />
                </li> */}
            </ul>
        </div>
    )
}

export default SideNav