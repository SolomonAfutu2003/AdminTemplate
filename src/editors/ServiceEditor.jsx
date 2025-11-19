import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import serviceApi from "../API/serviceAPI";
import IconSelector from "../components/IconSelector";
import * as Icons from "lucide-react";

const ServiceEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",  // icon name
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --------------------------------------------------------
  // ✅ Load existing service
  // --------------------------------------------------------
  useEffect(() => {
    if (!id) return;

    const loadService = async () => {
      try {
        setLoading(true);
        const res = await serviceApi.getById(id);

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          icon: res.data.icon || "",
        });
      } catch (err) {
        console.error("Error fetching service:", err);
        setMessage("❌ Failed to load service.");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  // Handle text inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --------------------------------------------------------
  // ✅ Save service
  // --------------------------------------------------------
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        icon: form.icon,
      };

      let response;
      if (id) {
        response = await serviceApi.update(id, payload);
        setMessage("✅ Service updated!");
      } else {
        response = await serviceApi.create(payload);
        setMessage("✅ Service created!");
      }

      console.log("Saved Service:", response.data);

      setTimeout(() => navigate("/services_page"), 1200);
    } catch (err) {
      console.error("Error saving:", err);
      setMessage("❌ Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between gap-4 p-4 rounded-xl bg-white shadow">
        <h1 className="text-3xl font-black">
          {id ? "Edit Service" : "Add New Service"}
        </h1>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`rounded-lg h-10 px-4 font-bold transition ${
            loading
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : id ? "Update" : "Publish"}
        </button>
      </div>

      {/* Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="bg-white p-6 rounded-xl shadow">
            <label className="flex flex-col">
              <span className="font-bold pb-2">Service Name</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter service name"
                className="w-full rounded-lg border focus:ring-2 h-12 p-3"
              />
            </label>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow space-y-3">
            <p className="font-bold">Description</p>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded-lg w-full h-64 p-4"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="font-bold pb-4">Select Icon</p>

            <IconSelector
              value={form.icon}
              onChange={(icon) => setForm({ ...form, icon })}
            />

            {form.icon && (
              <div className="mt-4 flex justify-center">
                {React.createElement(Icons[form.icon], { size: 60 })}
              </div>
            )}
          </div>
        </div>
      </section>

      {message && (
        <p
          className={`text-center text-sm font-semibold ${
            message.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ServiceEditor;
