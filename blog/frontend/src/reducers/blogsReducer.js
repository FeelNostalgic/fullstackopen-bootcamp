import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const updatedBlog = action.payload
      state = state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      return state
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, like, remove, setBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blog.id, updatedObject)
      dispatch(like(updatedBlog))
    } catch (exception) {
      dispatch(showNotification('Error updating blog', 'error', 5))
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(remove(blogToDelete))
      dispatch(showNotification('Blog deleted successfully', 'success', 5))
    } catch (exception) {
      dispatch(showNotification('Error deleting blog', 'error', 5))
    }
  }
}

export default blogsSlice.reducer