import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "../API/productAPI";
import Editor from "../components/Editor";

const ProductEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "", // preview
        imageFile: null, // file for upload
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Fetch product data if editing
    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await productApi.getById(id);
                const data = res.data;

                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    image:
                        data.imageBase64 && data.imageBase64.startsWith("data:")
                            ? data.imageBase64
                            : data.imageBase64
                                ? `data:image/jpeg;base64,${data.imageBase64}`
                                : "https://via.placeholder.com/400x200?text=No+Image",
                    imageFile: null,
                });
            } catch (err) {
                console.error("Error loading product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // ✅ Handle text inputs
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Handle file upload + preview
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setForm((prev) => ({ ...prev, imageFile: file }));

        const reader = new FileReader();
        reader.onloadend = () =>
            setForm((prev) => ({ ...prev, image: reader.result }));
        reader.readAsDataURL(file);
    };

    // ✅ Create or update product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            if (form.imageFile) formData.append("image", form.imageFile);

            let res;
            if (id) {
                res = await productApi.update(id, formData);
                setMessage("✅ Product updated successfully!");
            } else {
                res = await productApi.create(formData);
                setMessage("✅ Product created successfully!");
            }

            console.log("Saved Product:", res.data);
            setTimeout(() => navigate("/blog_dashboard"), 1500);
        } catch (err) {
            console.error("Error saving product:", err.response?.data || err.message);
            setMessage("❌ Failed to save product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between gap-4 p-4 rounded-xl bg-white shadow-soft">
                <h1 className="text-3xl font-black">
                    {id ? "Edit Product" : "Add New Product"}
                </h1>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-lg h-10 px-4 bg-primary text-black text-sm font-bold"
                >
                    {loading ? "Saving..." : id ? "Update" : "Publish"}
                </button>
            </div>

            {/* Form */}
            <section className="grid grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="flex flex-col gap-8">
                    {/* Product Name */}
                    <div className="bg-white p-6 rounded-xl">
                        <label className="flex flex-col">
                            <p className="font-bold pb-2">Product Name</p>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full rounded-lg border focus:ring-2 focus:border-none h-12 p-3 text-base"
                            />
                        </label>
                    </div>

                    {/* Description Editor */}
                    <div className="bg-white p-6 rounded-xl space-y-3 shadow-soft">
                        <p className="font-bold">Description</p>
                        <Editor
                            content={form.description}
                            onChange={(val) => setForm({ ...form, description: val })}
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col gap-8">
                    {/* Image Upload */}
                    <div className="bg-white p-6 rounded-xl text-center">
                        <p className="font-bold pb-4">Product Image</p>
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
                </div>
            </section>

            {message && (
                <p className="text-center text-sm font-semibold text-gray-700">
                    {message}
                </p>
            )}
        </div>
    );
};

export default ProductEditor;
