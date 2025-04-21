import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogInfo = () => {
  const id = useParams().id
  const users = useSelector(({ users }) => users)
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 bg-light-50 mt-10 rounded-lg shadow-md">
      <h1 className="text-3xl mx-4 my-6 font-bold pt-5">{user.name}</h1>
      <div className="overflow-x-auto border-t border-body pt-1">
      <h3 className="text-1xl mx-4 my-5 font-bold text-center">Added blogs</h3> 
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id} className='p-3 border bg-light border-dark-50 rounded-md hover:bg-dark-50 transition-colors m-6'>
              <a href={`/blogs/${blog.id}`} className="hover:text-dark text-base">{blog.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserBlogInfo