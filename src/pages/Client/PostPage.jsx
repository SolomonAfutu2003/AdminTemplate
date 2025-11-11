import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import blogApi from "../../API/blogAPI";
import { LoaderCircle } from "lucide-react";
import SideCard from "../../components/SideCard";
import MarkdownRenderer from "../../components/MarkdownRenderer";



const PostPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await blogApi.getAll();
                const shuffled = [...res.data].sort(() => Math.random() - 0.5);
                setBlogs(shuffled);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blog posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-[400px]"><LoaderCircle className="animate-spin" size={40} /></div>;
    if (!blog) return <p className="text-center">Blog not found.</p>;

    return (
        <div className="flex justify-between p-5">
            <div className="w-[70%] p-4 flex flex-col justify-center items-center">
                <img src={blog.imageBase64
                    ? `data:image/jpeg;base64,${blog.imageBase64}`
                    : "https://via.placeholder.com/400x200?text=No+Image"} alt="" />
                <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                <MarkdownRenderer content={blog.content} />
                {/* <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: }}
                /> */}
            </div>

            <section className="space-y-6 w-[30%] ">

                <div className="bg-white shadow-lg rounded-md p-3">
                    <div className="space-y-3">
                        {blogs.slice(0, 3).map((data) => (
                            <Link
                                key={data._id || data.id}
                                to={`/post_page/${data._id || data.id}`}
                                className="block hover:scale-105 transition transform"
                            >
                                <SideCard
                                    image={data.imageBase64 ? `data:image/jpeg;base64,${data.imageBase64}` : ""}
                                    title={data.title}
                                    content={data.content}
                                    isHtml={true}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default PostPage;
