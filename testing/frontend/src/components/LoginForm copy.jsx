import { Header2 } from "./Headers"

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return ( 
    <div>
      {/* <Header2 text='login in to application' /> */}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm