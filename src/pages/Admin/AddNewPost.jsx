import React from 'react'
import Editor from '../../components/Editor'

const AddNewPost = () => {
  return (
    <div className='space-y-5'>
      <header>
        <h3 className='text-gray-400'>Blog Posts</h3>
        <h2 className='text-3xl text-gray-600'>Add New Post</h2>
      </header>

      <main className=''>
        <section>
          <Editor />
        </section>
      </main>
    </div>
  )
}

export default AddNewPost