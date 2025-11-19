import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import profile from "../../assets/Image1.jpg";
import BlogCards from "../../components/BlogCards";
import Btn from "../../components/Btn";
import serviceApi from "../../API/serviceAPI";

const Service = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [services, setServices] = useState([]);
    const [showMenu, setShowMenu] = useState("");
    const navigate = useNavigate();
    const menuRef = useRef(null); // ✅ for navigation

    // 🔹 Fetch blogs from backend
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await serviceApi.getAll();
                setServices(res.data); // make sure API returns an array
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("Failed to load blog posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // ✅ Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            // If menuRef exists and click is outside it → close
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔹 Toggle blog visibility (for Home page only)
    const handleToggleVisibility = async (id) => {
        try {
            setLoading(true);
            const service = services.find(b => b.id === id);
            const newVisibility = !service.isVisible;

            // Call the hide/show API endpoint
            await serviceApi.hide(id);

            // Update local state to reflect the change
            setServices(prev => prev.map(b =>
                b.id === id ? { ...b, isVisible: newVisibility } : b
            ));

            alert(`✅ Product ${newVisibility ? 'shown on Home page' : 'hidden from Home page'}!`);
            setShowMenu(null); // Close the menu after action
        } catch (err) {
            console.error("Error toggling visibility:", err.response?.data || err.message);
            alert("❌ Failed to update visibility.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Delete a blog post
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog post?")) return;

        try {
            setLoading(true);
            await serviceApi.delete(id);
            setServices((prev) => prev.filter((b) => b.id !== id));
            alert("✅ Blog deleted successfully!");
        } catch (err) {
            console.error("Error deleting blog:", err.response?.data || err.message);
            if (err.response?.status === 401) {
                alert("Session expired. Please log in again.");
            } else {
                alert("❌ Failed to delete post.");
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Edit a blog post
    const handleEdit = (id) => {
        navigate(`/service/edit/${id}`); // ✅ go to edit page
    };

    const handleShowMenu = (id) => {
        setShowMenu(prev => (prev === id ? null : id));
    };

    return (
        <div className="space-y-5">
            <header>
                <h3 className="text-gray-400">Services</h3>
                {/* Admin info - show ALL blogs */}
                <div className="text-sm text-gray-500 mt-2">
                    Total Blogs: {services.length} |
                    <span className="text-green-600"> Visible on Home: {services.filter(blog => blog.isVisible).length}</span> |
                    <span className="text-red-600"> Hidden from Home: {services.filter(blog => !blog.isVisible).length}</span>
                </div>
            </header>

            <main className="space-y-5">
                {loading && <p>Loading blogs...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* ✅ Backend blogs */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {!loading &&
                        services.map((service) => (
                            <div key={service.id} className="space-y-3 ">
                                {!service.isVisible && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                                        HIDDEN
                                    </div>
                                )}
                                <BlogCards
                                    title={service.title}
                                    text={service.description}
                                    blogImage={
                                        service.imageUrl || ""
                                    }
                                    isHtml={true}
                                    showMenu={true}
                                    onclick={() => handleShowMenu(service.id)}
                                />
                                <div className="relative" >
                                    {showMenu === service.id && (
                                        <div ref={menuRef} className="w-[40%] z-10 absolute -bottom-14 right-0 p-3 bg-white rounded-lg shadow-xl">
                                            <Btn
                                                text="Edit"
                                                onClick={() => handleEdit(service.id)}
                                                style={" text-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg font-bold"}
                                            />
                                            <Btn
                                                text={service.isVisible ? "Hide" : "Show"}
                                                onClick={() => handleToggleVisibility(service.id)}
                                                style={`${service.isVisible ? "text-yellow-400 hover:text-yellow-600" : "text-green-400 hover:text-green-600"} px-3 py-1 rounded-lg font-bold w-full text-left`}
                                            />
                                            <Btn
                                                text="Delete"
                                                onClick={() => handleDelete(service.id)}
                                                style={" text-red-400 hover:text-red-600 px-3 py-1 rounded-lg font-bold"}
                                            />
                                        </div>)}
                                </div>
                            </div>
                        ))}
                </section>
            </main>
        </div>
    );
};

export default Service;
