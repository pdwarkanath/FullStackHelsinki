import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginLogout from './components/LoginLogout'
import TogglableBlogForm from './components/TogglableBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('')

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  
  const handleLogin = async (loggingInUser) => {
    try {
      const loginUser = await loginService.login({
        username: loggingInUser.username, 
        password: loggingInUser.password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )
      setUser(loginUser)
      blogService.setToken(loginUser.token)
    } catch (exception) {
      setNotificationStyle('error')
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  const handleCreate = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      setNotificationStyle('success')
      setNotification(`New blog ${newBlog.title} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      setNotificationStyle('error')
      setNotification(`Could not add ${newBlog.title}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const handleLike = async (id) => {
    const newBlog = blogs.find(blog => blog.id === id)
    newBlog.likes += 1
    setBlogs(blogs.filter(blog => blog.id !== id).concat(newBlog))
    await blogService.update(id, newBlog)
  }
  const handleDelete = async (id, title, author) => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      setBlogs(blogs.filter(blog => blog.id !== id))
      await (blogService.remove(id))
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
      <LoginLogout user={user} handleLogout = {handleLogout} handleLogin={handleLogin} />
      <TogglableBlogForm user={user} handleCreate={handleCreate} />
      {blogs
        .sort((prev, curr) =>  curr.likes - prev.likes)
        .map(blog => <Blog key={blog.id} user={user} blog={blog} handleLike={() => handleLike(blog.id)} handleDelete={() => handleDelete(blog.id, blog.title, blog.author)}/>)}
    </div>
  )
}

export default App