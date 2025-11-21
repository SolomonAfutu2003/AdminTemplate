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
  const [showPreview, setShowPreview] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const previewRef = useRef(null);

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
      // Close menu if clicked outside
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null);
      }
      // Close preview if clicked outside
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        setShowPreview(null);
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

  const handlePreview = (id) => {
    setShowPreview(prev => (prev === id ? null : id));
    setShowMenu(null); // Close menu when opening preview
  }

  const closePreview = () => {
    setShowPreview(null);
  }

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
                blogImage={blog.imageUrl || ""}
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
                  <div ref={menuRef} className="w-[50%] absolute z-20 -bottom-20 right-0 p-3 bg-white rounded-lg shadow-xl space-y-1">
                    <Btn
                      text="Edit"
                      onClick={() => handleEdit(blog.id)}
                      style={"text-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg font-bold w-full text-left hover:bg-blue-50"}
                    />
                    <Btn
                      text={blog.isVisible ? "Hide" : "Show"}
                      onClick={() => handleToggleVisibility(blog.id)}
                      style={`${blog.isVisible ? "text-yellow-400 hover:text-yellow-600" : "text-green-400 hover:text-green-600"} px-3 py-1 rounded-lg font-bold w-full text-left hover:bg-gray-50`}
                    />
                    <Btn
                      text="Preview"
                      onClick={() => handlePreview(blog.id)}
                      style={"text-purple-400 hover:text-purple-600 px-3 py-1 rounded-lg font-bold w-full text-left hover:bg-gray-50"}
                    />
                    <Btn
                      text="Delete"
                      onClick={() => handleDelete(blog.id)}
                      style={"text-red-400 hover:text-red-600 px-3 py-1 rounded-lg font-bold w-full text-left hover:bg-red-50"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black opacity-100 z-50 flex items-center justify-center p-4">
            <div 
              ref={previewRef}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {blogs.map((blog) => (
                blog.id === showPreview && (
                  <div key={blog.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold">{blog.title}</h2>
                      <button
                        onClick={closePreview}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    {blog.imageUrl && (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <strong>Author:</strong> {blog.author || "Unknown"}
                      </div>
                      <div>
                        <strong>Category:</strong> {blog.category || "Uncategorized"}
                      </div>
                      <div>
                        <strong>Date:</strong> {blog.createdAt?.slice(0, 10) || "Unknown"}
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-2">Description:</h3>
                      <p className="text-gray-700 mb-4">{blog.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-2">Content:</h3>
                      <div 
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{ __html: blog.content }} 
                      />
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        blog.isVisible 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {blog.isVisible ? "Visible on Home Page" : "Hidden from Home Page"}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

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