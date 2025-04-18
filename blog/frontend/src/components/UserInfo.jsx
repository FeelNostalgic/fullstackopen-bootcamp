import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../reducers/userReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  return (
    <div>
      {user.name} logged in <Button onClick={() => dispatch(logout())} text='logout' />
    </div>
  )
}

export default UserInfo 