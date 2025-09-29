import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BlogCards = ({
  category,
  title,
  text,
  date,
  image,
  blogImage,
  cardStyle,
  imagePosition,
  categoryPosition,
  subStyle,
  showBookmark = false,
  isHtml = false, // 🔹 new prop to tell us if text is HTML
}) => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <div>
      <div className={`bg-white rounded-lg h-full space-y-3 ${cardStyle}`}>
        {/* Image section */}
        <section className="relative z-0">
          <div className="w-full h-40 rounded-t-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={blogImage}
              alt=""
            />
          </div>
          {category && (
            <div className={`absolute rounded-lg top-2 right-3 ${categoryPosition}`}>
              <p className="px-2 py-1">{category}</p>
            </div>
          )}
          {image && (
            <div
              className={`w-10 h-10 rounded-full overflow-hidden absolute border-2 border-white ${imagePosition}`}
            >
              <img className="w-full h-full object-cover" src={image} alt="" />
            </div>
          )}
        </section>

        {/* Content section */}
        <section>
          <div className="p-5">
            <h2 className="text-lg text-gray-800 font-bold text-left">
              {title}
            </h2>

            <div className="text-base text-gray-600 text-left ProseMirror">
              {isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: text }} />
              ) : (
                <p>{text}</p>
              )}
            </div>
          </div>

          {/* Footer section */}
          <div className={`relative ${subStyle}`}>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <span className="text-lg text-gray-600 font-bold">{date}</span>
              </div>
            </div>
            <div>
              {showBookmark && (
                <button
                  onClick={toggleBookmark}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="text-blue-600" size={20} />
                  ) : (
                    <Bookmark className="text-gray-600" size={20} />
                  )}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogCards;
