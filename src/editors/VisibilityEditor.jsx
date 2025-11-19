import React, { useState, useEffect } from "react";
import Switch from "../components/Switch";
import visibilityApi from "../API/visibilityAPI";
import pageApi from "../API/pagesAPI";

const sections = [
  { id: "header", label: "Header" },
  { id: "navbar", label: "Navbar" },
  { id: "footer", label: "Footer" },
  { id: "button", label: "Button" },
  { id: "blogs", label: "Blog Section" },
  { id: "products", label: "Product Section" },
  { id: "services", label: "Service Section" },
  { id: "latest", label: "Latest" },
  { id: "trending", label: "Trending" },
  { id: "national", label: "National" },
];

const pages = [
  { id: "home", label: "Home Page" },
  { id: "about", label: "About Page" },
  { id: "contact", label: "Contact Page" },
  { id: "service", label: "Service Page" },
  { id: "products", label: "Products Page" },
  { id: "blog", label: "Blog Page" },
];

const VisibilityEditor = () => {
  const [sectionsData, setSectionsData] = useState([]);
  const [pagesData, setPagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("sections");

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [sectionsRes, pagesRes] = await Promise.all([
        visibilityApi.getAll(),
        pageApi.getAll()
      ]);

      // Process sections
      const processedSections = sections.map(section => {
        const backendSection = sectionsRes.data.find(s => s.name === section.id);
        return {
          ...section,
          backendId: backendSection?.id,
          isVisible: backendSection ? backendSection.isVisible : true
        };
      });

      // Process pages
      const processedPages = pages.map(page => {
        const backendPage = pagesRes.data.find(p => p.pageName === page.id);
        return {
          ...page,
          backendId: backendPage?.id,
          isVisible: backendPage ? backendPage.isVisible : true
        };
      });

      setSectionsData(processedSections);
      setPagesData(processedPages);
    } catch (err) {
      console.error("Failed to load data:", err);
      alert("❌ Failed to load visibility settings");
    } finally {
      setLoading(false);
    }
  };

  // Toggle section
  const toggleSection = async (sectionId) => {
    const section = sectionsData.find(s => s.id === sectionId);
    if (!section?.backendId) return;

    try {
      setSaving(true);
      await visibilityApi.hide(section.backendId);
      
      setSectionsData(prev => 
        prev.map(s => 
          s.id === sectionId 
            ? { ...s, isVisible: !s.isVisible }
            : s
        )
      );
      
      alert(`✅ ${section.label} updated!`);
    } catch (err) {
      console.error("Toggle failed:", err);
      alert("❌ Failed to update section");
    } finally {
      setSaving(false);
    }
  };

  // Toggle page
  const togglePage = async (pageId) => {
    const page = pagesData.find(p => p.id === pageId);
    if (!page?.backendId) return;

    try {
      setSaving(true);
      await pageApi.hide(page.backendId);
      
      setPagesData(prev => 
        prev.map(p => 
          p.id === pageId 
            ? { ...p, isVisible: !p.isVisible }
            : p
        )
      );
      
      alert(`✅ ${page.label} updated!`);
    } catch (err) {
      console.error("Toggle failed:", err);
      alert("❌ Failed to update page");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center p-8">Loading visibility settings...</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-4xl font-bold">🔧 Visibility Editor</h2>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("sections")}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "sections"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sections ({sectionsData.filter(s => s.isVisible).length}/{sections.length})
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === "pages"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Pages ({pagesData.filter(p => p.isVisible).length}/{pages.length})
        </button>
      </div>

      {/* Sections Tab */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionsData.map((section) => (
              <div
                key={section.id}
                className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{section.label}</h3>
                    <p className={`text-sm ${section.isVisible ? "text-green-500" : "text-red-500"}`}>
                      {section.isVisible ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  
                  <Switch
                    checked={section.isVisible}
                    onChange={() => toggleSection(section.id)}
                    disabled={saving || !section.backendId}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pagesData.map((page) => (
              <div
                key={page.id}
                className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{page.label}</h3>
                    <p className={`text-sm ${page.isVisible ? "text-green-500" : "text-red-500"}`}>
                      {page.isVisible ? "Visible" : "Hidden"}
                    </p>
                  </div>
                  
                  <Switch
                    checked={page.isVisible}
                    onChange={() => togglePage(page.id)}
                    disabled={saving || !page.backendId}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Summary */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <h3 className="font-semibold text-gray-700">Sections</h3>
            <p className="text-2xl font-bold text-blue-600">
              {sectionsData.filter(s => s.isVisible).length}/{sections.length}
            </p>
            <p className="text-sm text-gray-500">Visible</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Pages</h3>
            <p className="text-2xl font-bold text-green-600">
              {pagesData.filter(p => p.isVisible).length}/{pages.length}
            </p>
            <p className="text-sm text-gray-500">Visible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityEditor;