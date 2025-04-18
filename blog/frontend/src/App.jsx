import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import BlogForm from './components/BlogForm'
import UserInfo from './components/UserInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableLoginForm from './components/TogglableLoginForm'

import { showNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const fetchInitialBlogs = async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs(sortByLikes(initialBlogs))
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
      dispatch(showNotification('Successfully logged in', 'success', 5))
    } catch (exception) {
      dispatch(showNotification('wrong credentials', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5))
    setBlogs(sortByLikes(blogs.concat(newBlog)))
  }

  const handleLike = async (blogObject) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    try {
      await blogService.update(blogObject.id, updatedBlog)
      setBlogs(sortByLikes(blogs.map(b => b.id !== blogObject.id ? b : updatedBlog)))
    } catch (exception) {
      dispatch(showNotification('Error updating blog', 'error', 5))
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm newBlog={createNewBlog} />
      </Togglable>
    )
  }

  const handleDelete = async (blogObject) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        dispatch(showNotification('Blog deleted successfully', 'success', 5))
      } catch (exception) {
        dispatch(showNotification('Error deleting blog', 'error', 5))
      }
    }
  }

  return (
    <div>
      <Header2 text={user === null ? 'Login to application' : 'Blogs'} />
      <Notification />
      {user === null ?
        <TogglableLoginForm handleLogin={handleLogin} />
        :
        <div>
          <UserInfo user={user} handleLogout={handleLogout} />
          {blogForm()}
          <Blogs blogs={blogs} sendLike={handleLike} sendDelete={handleDelete} user={user} />
        </div>
      }
    </div>
  )
}

export default App