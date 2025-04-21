import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectBlogs } from '../selectors/blogSelectors'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { addComentToBlog } from '../reducers/blogsReducer'

import { Header2 } from './Headers'
import Button from './Button'


const BlogInfo = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

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

  const handleCommentSubmit = (event) =>{
    event.preventDefault()
    dispatch(addComentToBlog(blog, comment))
    setComment('')
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

      <div>
        <h3>comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" placeholder="add comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogInfo
