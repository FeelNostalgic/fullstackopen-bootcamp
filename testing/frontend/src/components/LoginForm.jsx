import { Header2 } from "./Headers"
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('') 
  }

  return (
    <div>
      <Header2 text='Login' />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm 