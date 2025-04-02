import { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserInfo from './components/UserInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })
  const [user, setUser] = useState(null)

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

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      fetchInitialBlogs()
      setNotification({ message: 'Successfully logged in', type: 'success' })
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

  const createNewBlog = async (blogObject) => {  
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
    setBlogs(blogs.concat(newBlog))
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLike = async (blogObject) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }
    console.log(updatedBlog);
    
    try {
      await blogService.update(blogObject.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blogObject.id ? b : updatedBlog))
    } catch (exception) {
      setNotification({ message: 'Error updating blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)  
    }
  }

  const loginForm = () =>{
    return (
      <Togglable buttonLabel='login'>
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  const blogFormRef = useRef()

  const blogForm = () =>{
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm newBlog={createNewBlog} />
      </Togglable>
    )
  }
    
  return (
    <div> 
      <Header2 text= {user === null ? 'Login to application' : 'Blogs'} />
      <Notification message={notification.message} type={notification.type} />
      {user === null ?
        loginForm()
        :
        <div>
          <UserInfo user={user} handleLogout={handleLogout} />
          {blogForm()}
          <Blogs blogs={blogs} sendLike={handleLike} />
        </div>
      }
    </div>
  )
}

export default App