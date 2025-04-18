import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import UserInfo from './components/UserInfo'
import { Header2 } from './components/Headers'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import TogglableLoginForm from './components/TogglableLoginForm'
import TogglableBlogForm from './components/TogglableBlogForm'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'

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
  }, [dispatch])

  return (
    <div>
      <Header2 text={user === null ? 'Login to application' : 'Blogs'} />
      <Notification />
      {user === null ?
        <TogglableLoginForm />
        :
        <div>
          <UserInfo />
          <TogglableBlogForm />
          <Blogs user={user} />
        </div>
      }
    </div>
  )
}

export default App