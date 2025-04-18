import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, sendLike, sendDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    sendLike(blog)
  }

  const handleDelete = () => {
    sendDelete(blog)
  }

  return (
    <div style={blogStyle} className="blog-container">
      <div className="blog-header">{blog.title} {blog.author}</div>
      <Button onClick={() => toggleVisibility()} text={visible ? 'hide' : 'view'} />
      {visible && (
        <div className="blog-details">
          <p className="blog-url"><a href={blog.url}>{blog.url}</a></p>
          <div className="blog-likes">
            likes {blog.likes} <Button onClick={handleLike} text='like' />
          </div>
          <p className="blog-user">{blog.user.username}</p>
          {blog.user.username === user.username && (
            <Button onClick={handleDelete} text='remove' style={{ backgroundColor: 'red', color: 'white' }} />
          )}
        </div>
      )}
    </div>
  )
}

export default Blog