import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCards from "../../components/BlogCards";
import Btn from "../../components/Btn";
import blogApi from "../../API/blogAPI";

const BlogPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // 🔹 Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await blogApi.getAll();
        setBlogs(res.data);
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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Delete a blog post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      setLoading(true);
      await blogApi.delete(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
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

  // 🔹 Toggle blog visibility (for Home page only)
  const handleToggleVisibility = async (id) => {
    try {
      setLoading(true);
      const blog = blogs.find(b => b.id === id);
      const newVisibility = !blog.isVisible;
      
      // Call the hide/show API endpoint
      await blogApi.hide(id);
      
      // Update local state to reflect the change
      setBlogs(prev => prev.map(b => 
        b.id === id ? { ...b, isVisible: newVisibility } : b
      ));
      
      alert(`✅ Blog ${newVisibility ? 'shown on Home page' : 'hidden from Home page'}!`);
      setShowMenu(null); // Close the menu after action
    } catch (err) {
      console.error("Error toggling visibility:", err.response?.data || err.message);
      alert("❌ Failed to update visibility.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit a blog post
  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  const handleShowMenu = (id) => {
    setShowMenu(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-4xl text-black font-bold">Blog Posts Management</h2>
        {/* Admin info - show ALL blogs */}
        <div className="text-sm text-gray-500 mt-2">
          Total Blogs: {blogs.length} | 
          <span className="text-green-600"> Visible on Home: {blogs.filter(blog => blog.isVisible).length}</span> | 
          <span className="text-red-600"> Hidden from Home: {blogs.filter(blog => !blog.isVisible).length}</span>
        </div>
      </header>

      <main className="space-y-5">
        {loading && <p>Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* ✅ Show ALL blogs in admin (no filtering) */}
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!loading && blogs.map((blog) => (
            <div key={blog.id} className="space-y-3 relative">
              {/* Visibility indicator badge */}
              {!blog.isVisible && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                  HIDDEN
                </div>
              )}
              
              <BlogCards
                blogImage={
                  blog.imageUrl || ""
                }
                title={blog.title}
                description={blog.description}
                date={blog.createdAt?.slice(0, 10) || "Today"}
                author={blog.author}
                subStyle="p-3"
                showMenu={true}
                category={blog.category}
                onclick={() => handleShowMenu(blog.id)}
                // Optional: Add visual indication for hidden blogs
                cardStyle={!blog.isVisible ? "opacity-80 border-2 border-red-300" : ""}
              />
              <div className="relative">
                {showMenu === blog.id && (
                  <div ref={menuRef} className="w-[50%] absolute z-10 -bottom-20 right-0 p-3 bg-white rounded-lg shadow-xl space-y-1">
                    <Btn
                      text="Edit"
                      onClick={() => handleEdit(blog.id)}
                      style={"text-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg font-bold w-full text-left"}
                    />
                    <Btn
                      text={blog.isVisible ? "Hide" : "Show"}
                      onClick={() => handleToggleVisibility(blog.id)}
                      style={`${blog.isVisible ? "text-yellow-400 hover:text-yellow-600" : "text-green-400 hover:text-green-600"} px-3 py-1 rounded-lg font-bold w-full text-left`}
                    />
                    <Btn
                      text="Delete"
                      onClick={() => handleDelete(blog.id)}
                      style={"text-red-400 hover:text-red-600 px-3 py-1 rounded-lg font-bold w-full text-left"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Show message when no blogs at all */}
        {!loading && blogs.length === 0 && (
          <div className="text-center p-8 bg-gray-100 rounded-lg">
            <p className="text-gray-500">No blogs available.</p>
            <p className="text-sm text-gray-400 mt-2">Create your first blog post to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPosts;