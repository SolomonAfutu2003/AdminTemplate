import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import blogApi from "../API/blogAPI";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    layout: "image-top",
    image: "", // for preview (base64 or URL)
    imageFile: null, // actual file object
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch blog data if editing
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await blogApi.getById(id);
        const data = res.data;

        setForm({
          title: data.title || "",
          content: data.content || "",
          category: data.category || "",
          layout: data.layout || "image-top",
          image:
            data.imageBase64 && data.imageBase64.startsWith("data:")
              ? data.imageBase64
              : data.imageBase64
                ? `data:image/jpeg;base64,${data.imageBase64}`
                : "https://via.placeholder.com/400x200?text=No+Image",
          imageFile: null,
        });
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // ✅ Handle inputs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditorChange = (content) => setForm({ ...form, content });

  // ✅ Handle file upload with live preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));

    const reader = new FileReader();
    reader.onloadend = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  // ✅ Create or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("layout", form.layout);
      if (form.imageFile) formData.append("image", form.imageFile);

      let res;
      if (id) {
        res = await blogApi.update(id, formData);
        setMessage("✅ Post updated successfully!");
      } else {
        res = await blogApi.create(formData);
        setMessage("✅ Post created successfully!");
      }

      console.log("Saved Post:", res.data);
      setTimeout(() => navigate("/blog_posts"), 1500);
    } catch (err) {
      console.error("Error saving post:", err.response?.data || err.message);
      setMessage("❌ Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between gap-4 p-4 rounded-xl bg-white shadow-soft">
          <h1 className="text-3xl font-black">{id ? "Edit Post" : "Add New Post"}</h1>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg h-10 px-4 bg-primary text-black text-sm font-bold"
            >
              {loading ? "Saving..." : id ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {/* Form */}
        <section className="grid grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="flex flex-col gap-8">
            {/* Title */}
            <div className="bg-white p-6 rounded-xl">
              <label className="flex flex-col">
                <p className="font-bold pb-2">Post Title</p>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter your post title"
                  className="w-full rounded-lg border focus:ring-2 focus:border-none h-12 p-3 text-base"
                />
              </label>
            </div>

            {/* Editor */}
            <div className="bg-white p-6 rounded-xl space-y-3 shadow-soft">
              <p className="font-bold">Content</p>
              <Editor content={form.content} onChange={handleEditorChange} />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-8">
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="font-bold pb-4">Featured Image</p>
              <label className="flex flex-col items-center gap-4 border-2 border-dashed px-6 py-10 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <span className="material-symbols-outlined text-5xl text-gray-400">
                  cloud_upload
                </span>
                <p className="text-base font-bold">Upload Image</p>
                <p className="text-sm text-gray-500">Drag & drop or click</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-4 w-full h-56 object-cover rounded-lg shadow"
                />
              )}
            </div>

            <div className="bg-white p-6 rounded-xl">
              <label className="flex flex-col">
                <p className="font-bold pb-2">Category</p>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border focus:ring-2 focus:border-none h-12 p-3 text-base"
                >
                  <option value="">Select a Category</option>
                  <option value="Uncategorized">Uncategorized</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Writing">Writing</option>
                  <option value="Books">Books</option>
                </select>
              </label>
            </div>

            {/* Layout */}
            <div className="bg-white p-6 rounded-xl">
              <label className="flex flex-col">
                <p className="font-bold pb-2">Layout</p>
                <select
                  name="layout"
                  value={form.layout}
                  onChange={handleChange}
                  className="w-full rounded-lg border focus:ring-2 focus:border-none h-12 p-3 text-base"
                >
                  <option value="image-top">Image Top</option>
                  <option value="image-left">Image Left</option>
                  <option value="image-right">Image Right</option>
                  <option value="text-only">Text Only</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        {message && (
          <p className="text-center text-sm font-semibold text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default PostEditor;
