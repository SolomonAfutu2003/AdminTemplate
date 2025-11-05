import React, { useEffect, useState } from "react";
import BlogCards from "../../components/BlogCards";
import LinkBtn from "../../components/LinkBtn";
import blogApi from "../../API/blogAPI";
import productApi from "../../API/productAPI";
import Header from "../../components/sections/Header";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [header, setHeader] = useState({
    heading: "Dashboard",
    subheading: "Blog Overview",
    image: "",
    layout: "",
  });

  // ✅ Fetch Blogs + Products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [blogRes, productRes] = await Promise.all([
          blogApi.getAll(),
          productApi.getAll(),
        ]);
        setBlogs(blogRes.data);
        setFilteredBlogs(blogRes.data); // default all blogs
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Filter blogs by category
  const handleFilter = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  };

  const categories = ["All", "Uncategorized", "Design", "Development", "Writing", "Books"];

  // ✅ Load saved header layout
  useEffect(() => {
    const saved = localStorage.getItem("headerSection");
    if (saved) setHeader(JSON.parse(saved));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Header />

      <div className="flex justify-center items-start">
        <section className="space-y-8 w-full max-w-7xl">
          {/* Loading & Error */}
          {loading && <p className="text-center text-gray-500">Loading content...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-lg font-semibold border transition 
                  ${
                    activeCategory === cat
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 🔹 Blogs Section */}
          <article className="grid grid-cols-3 gap-5">
            {filteredBlogs.length === 0 ? (
              <p className="text-gray-500 text-center col-span-3">No blogs available.</p>
            ) : (
              filteredBlogs.map((blog) => (
                <div key={blog._id || blog.id} className="space-y-3 relative">
                  <BlogCards
                    title={blog.title}
                    text={blog.content}
                    category={blog.category}
                    blogImage={
                      blog.imageBase64
                        ? `data:image/jpeg;base64,${blog.imageBase64}`
                        : ""
                    }
                    isHtml={true}
                    cardStyle={"hover:scale-105 transition"}
                  />
                  <LinkBtn
                    to={`/post_page/${blog._id || blog.id}`}
                    text="View more"
                    className={
                      "bg-white px-3 py-1 text-blue-400 shadow-xl rounded-lg font-bold hover:bg-blue-400 hover:text-white"
                    }
                  />
                </div>
              ))
            )}
          </article>

          {/* 🔹 Products Section */}
          <article className="grid grid-cols-3 gap-5">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center col-span-3">No products available.</p>
            ) : (
              products.map((product) => (
                <div key={product._id || product.id} className="space-y-3">
                  <BlogCards
                    title={product.name}
                    text={product.description}
                    isHtml={true}
                    cardStyle={"hover:scale-105 transition"}
                  />
                  <LinkBtn
                    to={`/products_page/${product._id || product.id}`}
                    text="View more"
                    className={
                      "bg-white px-3 py-1 text-blue-400 shadow-xl rounded-lg font-bold hover:bg-blue-400 hover:text-white"
                    }
                  />
                </div>
              ))
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default Home;
