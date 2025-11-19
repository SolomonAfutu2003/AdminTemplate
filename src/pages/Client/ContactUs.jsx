import React, { useState, useEffect } from 'react'
import pagesApi from '../../API/pagesAPI'


const ContactUs = () => {
  const [pageVisibility, setPageVisibility] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  // Check page visibility
  useEffect(() => {
    const checkPageVisibility = async () => {
      try {
        setPageLoading(true);
        const res = await pagesApi.getAll();
        const homePage = res.data.find(page => page.pageName === "contact");

        if (homePage) {
          setPageVisibility(homePage.isVisible);
          console.log("Contact page visibility:", homePage.isVisible);
        } else {
          console.warn("Contact page not found in pages API");
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
    <div>ContactUs</div>
  )
}

export default ContactUs