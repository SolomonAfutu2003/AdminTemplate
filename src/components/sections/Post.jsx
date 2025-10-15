import React from "react";

const Post = ({ heading, subheading, image, layout = "image-top" }) => {
  const isImageLeft = layout === "image-left";
  const isImageRight = layout === "image-right";
  const isTextOnly = layout === "text-only";
  const isImageTop = layout === "image-top";

  const hasImage = image && !isTextOnly;

  return (
    <header
      className={`space-y-5 ${
        isImageLeft || isImageRight ? "md:space-y-0 md:flex md:items-center md:gap-6" : ""
      }`}
    >
      {/* Image Left or Right */}
      {(isImageLeft || isImageRight) && (
        <>
          {isImageLeft && hasImage && (
            <img
              src={image}
              alt=""
              className="w-full md:w-1/2 rounded-lg shadow object-cover"
            />
          )}

          <div className="flex-1 text-center md:text-left space-y-2">
            {heading && <h1 className="text-4xl font-bold">{heading}</h1>}
            {subheading && (
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: subheading }}
              />
            )}
          </div>

          {isImageRight && hasImage && (
            <img
              src={image}
              alt=""
              className="w-full md:w-1/2 rounded-lg shadow object-cover"
            />
          )}
        </>
      )}

      {/* Image Top */}
      {isImageTop && (
        <div className="text-center space-y-3">
          {hasImage && (
            <img
              src={image}
              alt=""
              className="mx-auto rounded-lg shadow-md max-h-72 object-cover"
            />
          )}
          {heading && <h1 className="text-4xl font-bold">{heading}</h1>}
          {subheading && (
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </div>
      )}

      {/* Text Only */}
      {isTextOnly && (
        <div className="text-center space-y-3">
          {heading && <h1 className="text-4xl font-bold">{heading}</h1>}
          {subheading && (
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: subheading }}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Post;
