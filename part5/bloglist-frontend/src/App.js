import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const logoutText = 'logout'
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationStyle('error')
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      await blogService.create(newBlog)
      setNotificationStyle('success')
      setNotification(`New blog ${title} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (exception) {
      setNotificationStyle('error')
      setNotification(`Could not add ${title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification = {notification} notificationStyle={notificationStyle}/>
      <LoginForm user={user} logoutText={logoutText} handleLogout = {handleLogout} username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
      <BlogForm user={user} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setURL={setURL} handleCreate={handleCreate} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App