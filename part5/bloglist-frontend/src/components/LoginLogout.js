import LoggedInUser from './LoggedInUser'
import LogoutButton from './LogoutButton'
import LoginForm from './LoginForm'

const LoginLogout = ({ user, handleLogout, handleLogin }) => {
    if (user === null) {
        return (
        <><LoginForm handleLogin={handleLogin} /></>
        )
    } else {
        return (
            <><LoggedInUser user = {user} /> <LogoutButton handleLogout={handleLogout} /></>
        )
    }
}

export default LoginLogout