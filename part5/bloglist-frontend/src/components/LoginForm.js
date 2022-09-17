import LoggedInUser from './LoggedInUser'
import LogoutButton from './LogoutButton'
const LoginForm = ({ user, logoutText, handleLogout, handleLogin, username, password, setUsername, setPassword }) => {
    if (user === null) {
        return (
        <form onSubmit={handleLogin}>
            <div>
                username 
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password 
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
        )
    } else {
        return (
            <><LoggedInUser user = {user} /> <LogoutButton text = {logoutText} handleLogout={handleLogout} /></>
        )
    }
}

export default LoginForm