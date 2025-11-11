import React, { useEffect, useState } from "react";
import BlogCards from "../../components/BlogCards";
import LinkBtn from "../../components/LinkBtn";
import blogApi from "../../API/blogAPI";
import productApi from "../../API/productAPI";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState({});

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

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
        setFilteredBlogs(blogRes.data);
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

  // ✅ Handle category filter
  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // reset page when filter changes

    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  };

  // ✅ Load saved visibility from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cmsVisibility");
    if (saved) {
      setVisibility(JSON.parse(saved));
    } else {
      setVisibility({
        header: true,
        navbar: true,
        footer: true,
        button: true,
        blog: true,
        product: true,
        latest: true,
        trending: true,
        national: true,
      });
    }
  }, []);

  const categories = ["All", "Uncategorized", "Design", "Development", "Writing", "Books"];

  // ✅ Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center items-start">
        <section className="space-y-15 w-full max-w-7xl">
          {visibility.blog && (
            <div className="space-y-5">
              <h3 className="text-4xl font-bold">Blog Post</h3>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold border transition 
                      ${activeCategory === cat
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Loading & Error */}
              {loading && <p className="text-center text-gray-500">Loading content...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && !error && filteredBlogs.length === 0 && (
                <p className="text-gray-500 text-center">No blogs available.</p>
              )}

              {/* 🔹 Blogs Section */}
              <article className="grid grid-cols-4 gap-5">
                {currentBlogs.map((blog) => (
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
                ))}
              </article>

              {/* 🔹 Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded ${currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ✅ Products Section */}
          {visibility.product && (
            <div className="space-y-5">
              <h3 className="text-4xl font-bold">Products</h3>
              {products.length === 0 && (
                <p className="text-gray-500 text-center col-span-3">No products available.</p>
              )}
              <article className="grid grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product._id || product.id} className="space-y-3">
                    <BlogCards
                      title={product.name}
                      text={product.description}
                      blogImage={
                        product.imageBase64
                          ? `data:image/jpeg;base64,${product.imageBase64}`
                          : ""
                      }
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
                ))}
              </article>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
