// editors/NavEditor.jsx
import React, { useEffect, useState } from "react";
import { Trash, Eye, EyeOff } from "lucide-react";
import tabApi from "../API/tabAPI";

const NavEditor = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLink, setNewLink] = useState({ name: "", path: "" });

  // ✅ Fetch all tabs
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await tabApi.getAll();
        setLinks(res.data || []);
      } catch (err) {
        console.error("Error fetching tabs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTabs();
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (field, value) => {
    setNewLink(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ✅ Add new link
  const addLink = async () => {
    if (!newLink.name.trim() || !newLink.path.trim()) {
      alert("Please enter both name and path");
      return;
    }

    // Ensure path starts with /
    const formattedPath = newLink.path.startsWith('/') ? newLink.path : `/${newLink.path}`;

    try {
      const res = await tabApi.create({
        name: newLink.name.trim(),
        path: formattedPath
      });
      setLinks([...links, res.data]);
      setNewLink({ name: "", path: "" });
    } catch (err) {
      console.error("Error creating link:", err);
      alert("❌ Failed to create link");
    }
  };

  // ✅ Delete link
  const removeLink = async (id) => {
    try {
      await tabApi.delete(id);
      setLinks(links.filter((link) => link.id !== id));
    } catch (err) {
      console.error("Error deleting link:", err);
      alert("❌ Failed to delete link");
    }
  };

  // ✅ Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      await tabApi.hide(id);

      // Update local state
      setLinks(prev => prev.map(link =>
        link.id === id ? { ...link, isVisible: !link.isVisible } : link
      ));
    } catch (err) {
      console.error("Error toggling visibility:", err);
      alert("❌ Failed to update visibility");
    }
  };

  // ✅ Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addLink();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-4 w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">Add Navigation Link</h2>

        {/* Input fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g., Home, About, Contact"
              value={newLink.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Path
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-2 rounded-l text-gray-600">
                /
              </span>
              <input
                type="text"
                placeholder="e.g., home, about, contact"
                value={newLink.path}
                onChange={(e) => handleInputChange("path", e.target.value.replace(/\//g, ''))}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 border-l-0 p-2 rounded-r focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The URL path for this link (without the leading slash)
            </p>
          </div>
        </div>

        <button
          onClick={addLink}
          disabled={!newLink.name.trim() || !newLink.path.trim()}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ➕ Add Link
        </button>
      </div>

      {/* Links List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Navigation Links</h2>
          <div className="text-sm text-gray-500">
            Total: {links.length} |
            <span className="text-green-600"> Visible: {links.filter(link => link.isVisible).length}</span> |
            <span className="text-red-600"> Hidden: {links.filter(link => !link.isVisible).length}</span>
          </div>
        </div>

        {links.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No links created yet</p>
        ) : (
          <ul className="space-y-3">
            {links.map((link, idx) => (
              <li
                key={link.id || `link-${idx}`}
                className={`flex justify-between items-center p-3 rounded-lg border ${link.isVisible ? 'bg-gray-50' : 'bg-red-50 border-red-200'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div>
                    <span className="font-medium text-gray-800">{link.name}</span>
                    <span className="text-gray-500 ml-2">→ {link.path}</span>
                  </div>
                  {!link.isVisible && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      Hidden
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Visibility Toggle Button */}
                  <button
                    onClick={() => toggleVisibility(link.id)}
                    className={`p-2 rounded transition-colors ${link.isVisible
                        ? 'text-green-600 hover:text-green-800 hover:bg-green-100'
                        : 'text-red-600 hover:text-red-800 hover:bg-red-100'
                      }`}
                    title={link.isVisible ? "Hide from navigation" : "Show in navigation"}
                  >
                    {link.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-100 transition-colors"
                    title="Delete link"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavEditor;