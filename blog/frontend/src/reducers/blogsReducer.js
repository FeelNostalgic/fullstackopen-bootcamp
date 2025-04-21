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
    updateBlog(state, action){
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { appendBlog, updateBlog, remove, setBlogs } = blogsSlice.actions

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
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(showNotification('Error liking blog', 'error', 5))
    }
  }
}

export const addComentToBlog = (blog, comment) => {
  return async (dispatch) => {
    try {      
      const updatedBlog = await blogService.comment(blog.id, comment)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(showNotification('Error adding comment', 'error', 5))
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