import { useSelector } from 'react-redux'
import { Header2 } from './Headers'

const UsersList = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div>
      <Header2 text="Users" />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList