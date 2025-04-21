import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { selectBlogsSortedByLikes } from '../selectors/blogSelectors'
import Blog from './Blog'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectBlogsSortedByLikes)

  const handleLike = async (blogObject) => {
    dispatch(likeBlog(blogObject))
  }

  const handleDelete = async (blogObject) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(blogObject))
    }
  }

  return (
    <div className="space-y-4 bg-default rounded-lg shadow-md pb-2">
      <h2 className="text-2xl mx-4 my-6 font-bold text-gray-800 pt-5">Blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id} className='p-3 border rounded-md bg-primary hover:bg-green-100 transition-colors m-6'>
          <a href={`/blogs/${blog.id}`} className="text-blue-600 hover:text-blue-800 text-lg"> {blog.title}</a>
          <div className="text-gray-600 text-xs">{blog.author}</div>
        </div>
      )}
    </div>
  )
}

export default Blogs
