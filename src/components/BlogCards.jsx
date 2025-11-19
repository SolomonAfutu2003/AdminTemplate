import React from "react";
import { EllipsisVertical } from "lucide-react";
import { getCategoryColor } from "../utils/CategoryColors"; // adjust path

const BlogCards = ({
  category,
  title,
  text,
  date,
  description,
  author,
  blogImage,
  cardStyle,
  // imagePosition,
  showMenu = false,
  isHtml = false,// 🔹 new prop to tell us if text is HTML
  onclick
}) => {
  // const [bookmarked, setBookmarked] = useState(false);
  const categoryColor = getCategoryColor(category);

  return (
    <div>
      <div className={`bg-white rounded-lg space-y-3 shadow-xl relative ${cardStyle}`}>
        {/* Image section */}
        <section>
          {blogImage && (<div className="w-full h-40 rounded-t-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={blogImage}
              alt=""
            />
          </div>)}
          {category && (
            <div
              className={`absolute top-2 right-3 text-white text-sm font-semibold rounded-lg px-2 py-1 shadow ${categoryColor}`}
            >
              <p className="px-2 py-1">{category}</p>
            </div>
          )}
        </section>

        {/* Content section */}
        <section>
          <div className="p-2">
            <h2 className="text-lg text-gray-800 font-bold text-left">
              {title}
            </h2>

            <div className="text-base/tight text-gray-600 text-left line-clamp-3 ProseMirror">
              {description && (
                <p>{description}</p>
              )}

              {isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: text }} />
              ) : (
                <p className="leading-8">{text}</p>
              )}
            </div>
          </div>

          {/* Footer section */}
          <div className='flex flex-col justify-between p-3'>
            <section className="flex justify-between">
              <div>
                <span className="text-lg text-gray-600 font-bold">{date}</span>
              </div>

              <div>
                {showMenu && (
                  <button
                    onClick={onclick}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    <EllipsisVertical className="text-blue-600" size={20} />
                  </button>
                )}
              </div>
            </section>
            <section>
              <p>{author}</p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogCards;
