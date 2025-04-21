import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { selectBlogsSortedByLikes } from '../selectors/blogSelectors'

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
    <div className="space-y-4 bg-light-50 rounded-lg shadow-md pb-2">
      <h2 className="text-2xl mx-4 my-6 font-bold pt-5">Blogs</h2>
      {blogs.map(blog =>
        <div key={blog.id} className='p-3 border border-primary rounded-md bg-light hover:bg-primary transition-colors m-6'>
          <a href={`/blogs/${blog.id}`} className="hover:text-dark text-lg"> {blog.title}</a>
          <div className="text-dark text-xs">{blog.author}</div>
        </div>
      )}
    </div>
  )
}

export default Blogs
