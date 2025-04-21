import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Header2 } from './Headers'

const UserBlogInfo = () => {
  const id = useParams().id
  const users = useSelector(({ users }) => users)
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 bg-gray-100 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl mx-4 my-6 font-bold text-gray-800 pt-5">{user.name}</h2>
      <h3 className="text-1xl mx-4 my-6 font-bold text-gray-800 pt-5 text-center">Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id} className='p-3 border rounded-md hover:bg-gray-50 transition-colors m-6'>
            <a href={`/blogs/${blog.id}`} className="text-blue-600 hover:text-blue-800 text-base hover:underline">{blog.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogInfo