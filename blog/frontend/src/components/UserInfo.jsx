import Button from './Button'

const UserInfo = ({ user, handleLogout }) => {
  return (
    <div>
      {user.name} logged in <Button onClick={handleLogout} text='logout' />
    </div>
  )
}

export default UserInfo 