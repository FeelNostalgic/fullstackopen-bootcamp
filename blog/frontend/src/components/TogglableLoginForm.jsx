import LoginForm from './LoginForm'
import Togglable from './Togglable'

const TogglableLoginForm = ({ handleLogin }) => {
    return (
        <Togglable buttonLabel='login'>
            <LoginForm handleLogin={handleLogin} />
        </Togglable>
    )
}

export default TogglableLoginForm

