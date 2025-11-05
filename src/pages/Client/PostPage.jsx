import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogApi from "../../API/blogAPI";
import { LoaderCircle } from "lucide-react";

const PostPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await blogApi.getById(id); // ✅ Axios
                const data = res.data; // Axios returns data directly
                setBlog(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const PostData = [
        { category: "Technology", title: "Conduct at an replied removal an amongst", text: "However venture pursuit he am mr cordial...", bg: "bg-red-400 text-white", date: "28 February 2019" },
        { category: "Presidential", title: "Conduct at an replied removal an amongst", text: "However venture pursuit he am mr cordial...", bg: "bg-blue-400 text-white", date: "28 February 2019" },
        { category: "Health", title: "Conduct at an replied removal an amongst", text: "However venture pursuit he am mr cordial...", bg: "bg-green-400 text-white", date: "28 February 2019" },
        { category: "Business", title: "Conduct at an replied removal an amongst", text: "However venture pursuit he am mr cordial...", bg: "bg-amber-400 text-white", date: "28 February 2019" },
    ];

    if (loading) return <div className="animate-spin flex justify-center items-center h-[400px]"><LoaderCircle size={40}/></div>;
    if (!blog) return <p className="text-center">Blog not found.</p>;

    return (
       <div className="flex justify-between p-5">
            <div className="w-[70%] p-4 flex flex-col justify-center items-center">
                <img src={blog.imageBase64
                    ? `data:image/jpeg;base64,${blog.imageBase64}`
                    : "https://via.placeholder.com/400x200?text=No+Image"} alt="" />
                <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>

            <section className="space-y-6 w-[30%]">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-md">
                            <ul>
                                {PostData.map((data, idx) => (
                                    <li key={idx} className="p-3 border-b border-gray-300 last:border-none">
                                        <h3 className="font-semibold">{data.title}</h3>
                                        <p className="text-sm text-gray-600">{data.category}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
       </div>
    );
};

export default PostPage;
