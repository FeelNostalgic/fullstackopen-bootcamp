import { Header2 } from "./Headers"
import { useState } from 'react'

const BlogForm = ({ newBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="space-y-4">
      <Header2 text='Create new blog' />
      <form id="blog-form" onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label className="mb-1">Title:</label>
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border rounded border-body px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
        <div className="flex flex-col">
          <label className=" mb-1">Author:</label>
          <input
            id="author-input"
            type="text"
            value={author}
            onChange={handleAuthorChange}
            className="border rounded border-body px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">URL:</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="border rounded border-body px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
        <button type="submit" className="bg-primary hover:bg-dark-50 font-medium w-32 py-2 px-10 rounded transition-colors">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
