import { createSelector } from '@reduxjs/toolkit'

export const selectBlogs = state => state.blogs

export const selectBlogsSortedByLikes = createSelector(
  [selectBlogs],
  (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
)
