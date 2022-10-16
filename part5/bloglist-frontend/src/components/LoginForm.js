import { useState } from 'react'
import Togglable from './Togglable'

const LoginForm = ({ user, handleLogout, handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const loggingInUser = {
            username: username,
            password: password
        }
        setUsername('')
        setPassword('')
        handleLogin(loggingInUser)
    }
    
    return (
        <Togglable showLabel = "Login" hideLabel = "Cancel">
            <form onSubmit={handleSubmit}>
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
        </Togglable>
    )  
}

export default LoginForm