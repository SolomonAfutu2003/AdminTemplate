import React, { useEffect, useState } from "react";
import BlogCards from "../../components/BlogCards";
import LinkBtn from "../../components/LinkBtn";
import blogApi from "../../API/blogAPI";
import productApi from "../../API/productAPI";
import serviceApi from "../../API/serviceAPI";
import visibilityApi from "../../API/visibilityAPI";
import pageApi from "../../API/pagesAPI";
import ServiceCard from "../../components/ServiceCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState({});
  const [pageVisibility, setPageVisibility] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  // Check page visibility
  useEffect(() => {
    const checkPageVisibility = async () => {
      try {
        setPageLoading(true);
        const res = await pageApi.getAll();
        const homePage = res.data.find(page => page.pageName === "home");

        if (homePage) {
          setPageVisibility(homePage.isVisible);
          console.log("Home page visibility:", homePage.isVisible);
        } else {
          console.warn("Home page not found in pages API");
          setPageVisibility(true); // Default to visible if not found
        }
      } catch (err) {
        console.error("Error checking page visibility:", err);
        setPageVisibility(true); // Default to visible on error
      } finally {
        setPageLoading(false);
      }
    };

    checkPageVisibility();
  }, []);

  // Fetch Blogs + Products + Services + Visibility
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [blogRes, productRes, serviceRes, visibilityRes] = await Promise.all([
          blogApi.getAll(),
          productApi.getAll(),
          serviceApi.getAll(),
          visibilityApi.getAll(),
        ]);

        setBlogs(blogRes.data);
        setFilteredBlogs(blogRes.data);
        setProducts(productRes.data);
        setServices(serviceRes.data);

        // Convert visibility array to object for easy access
        const visibilityObj = {};
        visibilityRes.data.forEach(item => {
          visibilityObj[item.name] = item.isVisible;
        });

        setVisibility(visibilityObj);

        console.log("✅ Data loaded:", {
          blogs: blogRes.data.length,
          products: productRes.data.length,
          services: serviceRes.data.length,
          visibility: visibilityObj
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter handler
  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);

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

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Show loading for page visibility check
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking page availability...</p>
        </div>
      </div>
    );
  }

  // Show hidden page message
  if (!pageVisibility) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Unavailable</h1>
          <p className="text-gray-600 mb-6">
            This page is currently hidden from public view. Please check back later.
          </p>
          <div className="text-sm text-gray-500">
            If you believe this is an error, please contact the administrator.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Status Indicator - Optional, can remove after testing */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
            <span className="text-green-800 font-medium">Home page is visible to the public</span>
          </div>
          <div className="text-sm text-green-600">
            Page Status: Active
          </div>
        </div>
      </div>

      <div className="flex justify-center items-start">
        <section className="space-y-15 w-full max-w-7xl">
          {/* Debug visibility status */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h4 className="font-semibold">Section Visibility Status:</h4>
            <div className="text-sm">
              Blogs: {visibility.blogs ? '✅ Visible' : '❌ Hidden'} |
              Products: {visibility.products ? '✅ Visible' : '❌ Hidden'} |
              Services: {visibility.services ? '✅ Visible' : '❌ Hidden'}
            </div>
          </div>

          {/* Blogs Section */}
          {visibility.blogs && (
            <div className="space-y-5">
              <h3 className="text-4xl font-bold">Blog Post</h3>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`px-4 py-2 rounded-lg font-semibold border transition ${activeCategory === cat
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Loading / Error */}
              {loading && <p className="text-center text-gray-500">Loading content...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && !error && filteredBlogs.length === 0 && (
                <p className="text-gray-500 text-center">No blogs available.</p>
              )}

              {/* Blog Cards */}
              <article className="grid grid-cols-4 gap-5">
                {currentBlogs.map((blog) => (
                  <div key={blog._id || blog.id} className="space-y-3 relative">
                    {blog.isVisible && (<div>
                      <BlogCards
                        title={blog.title}
                        text={blog.content}
                        category={blog.category}
                        blogImage={blog.imageUrl || ""}
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
                    </div>)}
                  </div>
                ))}
              </article>

              {/* Pagination Controls */}
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

          {/* Products Section */}
          {visibility.products && (
            <div className="space-y-5">
              <h3 className="text-4xl font-bold">Products</h3>
              {products.length === 0 && !loading && (
                <p className="text-gray-500 text-center col-span-3">No products available.</p>
              )}
              <section className="grid grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product._id || product.id} className="space-y-3">
                    {product.isVisible && (
                      <div>
                        <BlogCards
                          title={product.name}
                          text={product.description}
                          blogImage={product.imageUrl || ""}
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
                    )}
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* Services Section */}
          {visibility.services && (
            <div className="space-y-5">
              <h3 className="text-4xl font-bold">Services</h3>
              {services.length === 0 && !loading && (
                <p className="text-gray-500 text-center col-span-3">No services available.</p>
              )}
              <section className="grid grid-cols-3 gap-5">
                {services.map((service) => (
                  <div key={service._id || service.id} className="space-y-3">
                    {service.isVisible && (
                      <div>
                        <ServiceCard
                          title={service.title}
                          content={service.description}
                          icon={service.icon}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* Show message when all sections are hidden */}
          {!visibility.blogs && !visibility.products && !visibility.services && !loading && (
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-xl">All sections are currently hidden. Content will appear here when sections are made visible.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;