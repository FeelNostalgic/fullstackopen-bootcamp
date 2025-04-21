import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationReducer'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer