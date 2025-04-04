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
    <div>
      <Header2 text='Create new blog' />
      <form id="blog-form" onSubmit={handleSubmit}>
        <div>
          title:
          <input id="title-input" type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author:
          <input id="author-input" type="text" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input id="url-input" type="text" value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}       

export default BlogForm
