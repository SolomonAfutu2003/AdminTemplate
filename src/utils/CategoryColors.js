// utils/categoryColors.js
export const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "design":
        return "bg-pink-400";
      case "development":
        return "bg-green-500";
      case "writing":
        return "bg-yellow-400";
      case "books":
        return "bg-purple-500";
      default:
        return "bg-gray-400"; // Uncategorized or fallback
    }
  };
  