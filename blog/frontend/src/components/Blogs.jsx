import Blog from './Blog'

const Blogs = ({blogs, sendLike, sendDelete, user}) => {
  return (
   <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} sendLike={sendLike} sendDelete={sendDelete} user={user} />
      )}
   </div>
  )
}

export default Blogs
