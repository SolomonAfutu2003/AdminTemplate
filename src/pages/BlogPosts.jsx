import React, { useEffect, useState } from 'react'
import profile from "../assets/Image1.jpg"
import BlogCards from '../components/BlogCards'
import Btn from '../components/Btn'

const BlogPosts = () => {
  const PostData = [
    {
      category: "Technology",
      title: "Conduct at an replied removal an amongst",
      text: "However venture pursuit he am mr cordial...",
      bg: "bg-red-400 text-white",
      date: "28 February 2019"
    },
    {
      category: "Technology",
      title: "Conduct at an replied removal an amongst",
      text: "However venture pursuit he am mr cordial...",
      bg: "bg-blue-400 text-white",
      date: "28 February 2019"
    },
    {
      category: "Technology",
      title: "Conduct at an replied removal an amongst",
      text: "However venture pursuit he am mr cordial...",
      bg: "bg-green-400 text-white",
      date: "28 February 2019"
    },
    {
      category: "Technology",
      title: "Conduct at an replied removal an amongst",
      text: "However venture pursuit he am mr cordial...",
      bg: "bg-amber-400 text-white",
      date: "28 February 2019"
    }
  ]

  const [posts, setPosts] = useState([])

  // 🔹 Load posts from localStorage when page mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts")) || []
    setPosts(stored)
  }, [])

  return (
    <div className='space-y-5'>
      <header>
        <h3 className='text-gray-400'>Components</h3>
        <h2 className='text-3xl text-gray-600'>Blog Posts</h2>
      </header>
      <main className='space-y-5'>

        {/* Static cards */}
        {/* <section className='grid grid-cols-4 gap-2'>
          {PostData.map((data, idx) => (
            <BlogCards
              key={idx}
              blogImage={profile}
              imageStyle={"w-full h-40 rounded-t-lg object-cover"}
              category={data.category}
              categoryPosition={`${data.bg}`}
              
              title={data.title}
              text={data.text}
              date={data.date}
            />
          ))}
        </section> */}


        {/* ✅ User-created posts from Editor */}
        <section className="grid grid-cols-4 gap-2">
          {posts.map((post, idx) => (
            <div key={idx}>
              <BlogCards
                blogImage={profile}
                image={profile}
                imagePosition={"-bottom-5 left-5"}               // You can replace this with uploaded thumbnail
                imageStyle={"w-full h-40 rounded-t-lg object-cover"}
                category={post.category}
                categoryPosition={`top-2 right-3 ${post.bg}`}
                title={post.title}               // 👈 H1 as title
                text={post.content}              // 👈 Body (with HTML)
                date={post.date || "Today"}
                isHtml={true}                    // 👈 Render HTML correctly
                subStyle={"p-3"}
              />
              <Btn text={"Delete"} onClick={() => {
                const updated = posts.filter((_, i) => i !== idx);
                setPosts(updated);
                localStorage.setItem("posts", JSON.stringify(updated));
              }} />
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default BlogPosts
