import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import profile from "../../assets/Image1.jpg";
import BlogCards from "../../components/BlogCards";
import Btn from "../../components/Btn";
import productApi from "../../API/productAPI";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null); // ✅ for navigation

  // 🔹 Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await productApi.getAll();
        setProducts(res.data); // make sure API returns an array
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

  // 🔹 Delete a blog post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;

    try {
      setLoading(true);
      await productApi.delete(id);
      setProducts((prev) => prev.filter((b) => b.id !== id));
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
    navigate(`/product/edit/${id}`); // ✅ go to edit page
  };

  const handleShowMenu = (id) => {
    setShowMenu(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5">
      <header>
        <h3 className="text-gray-400">Components</h3>
        <h2 className="text-3xl text-gray-600">Blog Posts</h2>
      </header>

      <main className="space-y-5">
        {loading && <p>Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* ✅ Backend blogs */}
        <section className="grid grid-cols-4 gap-4">
          {!loading &&
            products.map((product) => (
              <div key={product.id} className="space-y-3 ">
               <BlogCards
                    title={product.name}
                    text={product.description}
                    blogImage={
                      product.imageBase64
                        ? `data:image/jpeg;base64,${product.imageBase64}`
                        : ""
                    }
                    isHtml={true}
                    showMenu={true}
                    onclick={() => handleShowMenu(product.id)}
                  />
                <div className="relative" >
                  {showMenu === product.id && (
                  <div ref={menuRef} className="w-[40%] absolute -bottom-14 right-0 p-3 bg-white rounded-lg shadow-xl">
                    <Btn
                      text="Edit"
                      onClick={() => handleEdit(product.id)}
                      style={" text-blue-400 hover:text-blue-600 px-3 py-1 rounded-lg font-bold"}
                    />
                    <Btn
                      text="Delete"
                      onClick={() => handleDelete(product.id)}
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

export default Product;
