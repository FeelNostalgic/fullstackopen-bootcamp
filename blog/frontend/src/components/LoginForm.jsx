import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (window.localStorage.getItem('loggedBlogAppUser') !== null) {
      navigate('/')
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col">
          <label className="mb-1">Usename</label>
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            className="border rounded border-body px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
        <div className='flex flex-col'>
          <label className="mb-1">Password</label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            className="border rounded border-body px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
        <button type='submit'
          className="bg-primary hover:bg-dark-50 font-medium w-32 py-2 px-10 rounded transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm 