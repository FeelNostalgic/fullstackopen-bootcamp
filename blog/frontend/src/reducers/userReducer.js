import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const login = (userObject) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }catch (exception) {
      dispatch(showNotification(`wrong credentials`, 'error', 5))
    }
    
  }
}

export const logout = (userObject) =>{
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer