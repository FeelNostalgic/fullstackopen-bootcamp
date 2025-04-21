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
    <div className="bg-light-50 my-4 rounded-lg p-4 shadow-sm">
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm newBlog={createNewBlog} />
    </Togglable>
  </div>
  )
}

export default TogglableBlogForm