import React from 'react'

const SideCard = ({ image, title, content, isHtml = false }) => {
  return (
    <div className="bg-blue-400 rounded-lg flex gap-4 p-3 text-white hover:bg-blue-500 transition">
      {image && (
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1 line-clamp-1">{title}</h4>
        {isHtml ? (
          <div
            className="line-clamp-3 text-xs"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="line-clamp-3 text-xs">{content}</p>
        )}
      </div>
    </div>
  );
};

export default SideCard;
