import { Header2 } from "./Headers"

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
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