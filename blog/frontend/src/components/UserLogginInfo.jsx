import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../reducers/userReducer'

const UserLogginInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  return (
    <>
      {user.name} logged in 
      <Button onClick={() => dispatch(logout())} text='logout' />
    </>
  )
}

export default UserLogginInfo 