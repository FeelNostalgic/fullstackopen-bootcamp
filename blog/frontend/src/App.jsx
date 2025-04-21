import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import UserInfo from './components/UserInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableLoginForm from './components/TogglableLoginForm'
import TogglableBlogForm from './components/TogglableBlogForm'
import UsersList from './components/UsersList'
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
    if (user) navigate('/')

    return (
      <div>
        <TogglableLoginForm />
      </div>
    )
  }

  return (
    <div>
      <Header2 text={user === null ? 'Login to application' : 'Blogs'} />
      <Notification />
      {user !== null && <UserInfo />}

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="home" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  )
}

export default App