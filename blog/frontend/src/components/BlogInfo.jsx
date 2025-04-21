import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectBlogs } from '../selectors/blogSelectors'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { addComentToBlog } from '../reducers/blogsReducer'

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

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    dispatch(addComentToBlog(blog, comment))
    setComment('')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h2>
      <div className="mb-4">
        <a href={blog.url} className="text-blue-600 hover:text-blue-800 hover:underline">{blog.url}</a>
      </div>
      <div className='flex items-center mb-3'>
        <span className="mr-2">{blog.likes} likes</span>
        <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm" >Like</button>
      </div>
      <div className="text-gray-700 mb-4 text-sm">
        added by {blog.author}
      </div>
      {blog.user.username === user.username && (
        <div className="mb-6">
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors">Remove</button>
        </div>
      )}

      <div className="mt-8 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4 flex space-x-3">
          <textarea
            placeholder="nothing yet..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            className="w-full resize-none overflow-hidden border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            onInput={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
          >
            Add comment
          </button>
        </form>
        <ul className="space-y-3 pl-5 pr-10">
          {blog.comments.map((comment, index) => (
            <li
              key={index}
              className="min-h-14 flex-grow text-gray-700 border border-gray-200 rounded-lg shadow-md p-3"
            >
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogInfo
