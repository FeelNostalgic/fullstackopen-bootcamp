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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <a href={`/blogs/${blog.id}`}>{blog.title}</a>
        </div>
      )}
    </div>
  )
}

export default Blogs
