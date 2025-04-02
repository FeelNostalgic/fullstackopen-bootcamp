import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserInfo from './components/UserInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const fetchInitialBlogs = async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
      fetchInitialBlogs()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      fetchInitialBlogs()
    } catch (exception) {
      setNotification({ message: 'wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }
    const newBlog = await blogService.create(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
    setBlogs(blogs.concat(newBlog))
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  return (
    <div> 
      <Header2 text= {user === null ? 'Login to application' : 'Blogs'} />
      <Notification message={notification.message} type={notification.type} />
      {user === null ?
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        :
        <div>
          <UserInfo user={user} handleLogout={handleLogout} />
          <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleSubmit={handleSubmitBlog} />
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App