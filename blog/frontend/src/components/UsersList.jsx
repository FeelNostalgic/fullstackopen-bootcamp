import { useSelector } from 'react-redux'

const UsersList = () => {
  const users = useSelector(({ users }) => users)

  return (
    <div className="max-w-4xl mx-auto p-6 mt-5 bg-light-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto border-collapse'>
          <thead className='text-xl bg-dark-50 border-b border-dark h-12'>
            <tr>
              <th className="text-left px-4 py-2 font-semibold">User</th>
              <th className="text-right px-8 py-2 font-semibold">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className='border-b border-dark h-8 hover:bg-light bg-primary'
              >
                <td className="px-4 py-2">
                  <a href={`/users/${user.id}`} className="hover:text-blue-950 hover:underline transition-colors">
                    {user.name}
                  </a>
                </td>
                <td className="px-22 py-2 text-right text-gray-300">
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