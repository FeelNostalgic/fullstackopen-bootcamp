import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'

import UserLogginInfo from './components/UserLogginInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableLoginForm from './components/TogglableLoginForm'
import TogglableBlogForm from './components/TogglableBlogForm'
import UsersList from './components/UsersList'
import UserBlogInfo from './components/UserBlogInfo'
import BlogInfo from './components/BlogInfo'

import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

import blogService from './services/blogs'

import './index.css'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
    dispatch(initializeUsers())
  }, [dispatch])

  const Home = () => {
    return (
      <div>
        <TogglableBlogForm />
        <p></p>
        <Blogs user={user} />
      </div>
    )
  }

  const Login = () => {
    return (
      <div>
        <TogglableLoginForm />
      </div>
    )
  }

  const padding = {
    padding: '20px',
    color: 'black',
    display: 'inline'
  }

  const background = {
    backgroundColor: 'lightgray',
    height: '30px'
  }

  const NavigationBar = () => {
    return (
      <div style={background}>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {user !== null && <UserLogginInfo />}
      </div>)
  }

  return (
    <div>
      {user !== null && <NavigationBar/>}
      <Header2 text={user === null ? 'Login to application' : 'Blogs'} />
      <Notification />
      

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="home" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserBlogInfo />} />
        <Route path="/blogs/:id" element={<BlogInfo user={user} />} />
      </Routes>
    </div>
  )
}

export default App