import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectBlogs } from '../selectors/blogSelectors'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

import { Header2 } from './Headers'
import Button from './Button'


const BlogInfo = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id
  const blogs = useSelector(selectBlogs)
  const blog = blogs.find(b => b.id === id)

  if (!blog) return

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      <Header2 text={blog.title} />
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <Button text="like" onClick={handleLike} /></div>
      <div>added by {blog.author}</div>
      {blog.user.username === user.username && (
        <Button onClick={handleDelete} text='remove' style={{ backgroundColor: 'red', color: 'white' }} />
      )}
    </div>
  )
}

export default BlogInfo
