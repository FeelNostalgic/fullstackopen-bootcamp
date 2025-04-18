import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      setNotification(state, action) {
        console.log(action.payload);
        return action.payload
      },
      clearNotification() {
        return {}
      }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer