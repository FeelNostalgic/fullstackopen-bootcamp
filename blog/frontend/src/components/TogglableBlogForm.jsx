import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { createBlog } from '../reducers/blogsReducer'

const TogglableBlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  return (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm newBlog={createNewBlog} />
    </Togglable>
  )
}

export default TogglableBlogForm