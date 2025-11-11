// components/MarkdownRenderer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";          // Enables GitHub Flavored Markdown (tables, lists, etc.)
import rehypeRaw from "rehype-raw";          // Allows raw HTML inside markdown
// import rehypeSanitize from "rehype-sanitize"; // Sanitizes HTML for security

const MarkdownRenderer = ({ content }) => {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;
