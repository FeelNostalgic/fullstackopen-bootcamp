import { useSelector } from 'react-redux'
import { Header2 } from './Headers'

const UsersList = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div className="max-w-4xl mx-auto p-6 mt-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Users</h2>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto border-collapse'>
          <thead className='text-xl bg-blue-300 border-b border-gray-300 h-12'>
            <tr>
              <th className="text-left px-4 py-2 font-semibold">User</th>
              <th className="text-right px-8 py-2 font-semibold">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className='border-b border-gray-300 h-8 hover:bg-blue-200 bg-blue-100'
              >
                <td className="px-4 py-2">
                  <a href={`/users/${user.id}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {user.name}
                  </a>
                </td>
                <td className="px-22 py-2 text-right">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersList