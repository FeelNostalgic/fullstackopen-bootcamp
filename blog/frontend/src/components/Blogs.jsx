import Blog from './Blog'

const Blogs = ({blogs, sendLike}) => {
  return (
   <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} sendLike={sendLike} />
      )}
   </div>
  )
}

export default Blogs
