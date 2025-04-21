import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableLoginForm from './components/TogglableLoginForm'
import TogglableBlogForm from './components/TogglableBlogForm'
import UsersList from './components/UsersList'
import UserBlogInfo from './components/UserBlogInfo'
import BlogInfo from './components/BlogInfo'
import NavBar from './components/NavBar'

import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

import blogService from './services/blogs'

import './index.css'

const App = () => {
  const dispatch = useDispatch()
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
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        <TogglableBlogForm />
        <p></p>
        <Blogs user={user} />
      </div>
    )
  }

  const Login = () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl space-y-8 bg-light-50 my-4 rounded-lg p-4 shadow-sm">
          <TogglableLoginForm />
        </div>
      </div>
    )
  }

  return (
    <div>
      {user !== null && <NavBar user={user} />}
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