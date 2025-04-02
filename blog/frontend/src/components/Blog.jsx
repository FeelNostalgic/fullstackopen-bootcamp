import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
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
    console.log('like button clicked')
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Button onClick={() => toggleVisibility()} text={visible ? 'hide' : 'view'} />
      {visible && (
        <div>
          <p>{blog.url}</p>
          <div>
            likes {blog.likes} <Button onClick={() => handleLike()} text='like' />
          </div>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog