import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { selectBlogsSortedByLikes } from '../selectors/blogSelectors'
import Blog from './Blog'

const Blogs = ({user}) => {
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
   <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} sendLike={handleLike} sendDelete={handleDelete} user={user} />
      )}
   </div>
  )
}

export default Blogs
