import LoginForm from './LoginForm'
import Togglable from './Togglable'

const TogglableLoginForm = ({ handleLogin }) => {
    return (
        <Togglable buttonLabel='Login'>
            <LoginForm />
        </Togglable>
    )
}
export default TogglableLoginForm

