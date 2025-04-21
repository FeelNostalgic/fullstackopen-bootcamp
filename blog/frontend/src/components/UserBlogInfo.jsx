import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Header2 } from './Headers'

const UserBlogInfo = () => {
  const id = useParams().id
  const users = useSelector(({ users }) => users)
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <Header2 text={user.name} />
      <h3>added blogs</h3>
      <ul>
      {user.blogs.map(blog => (
        <li key={blog.id}>
          {blog.title}
        </li>
      ))}
      </ul>

    </div>
  )
}

export default UserBlogInfo