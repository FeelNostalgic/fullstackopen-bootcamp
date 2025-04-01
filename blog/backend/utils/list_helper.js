const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
    return blogs.reduce((max, blog) => {
        return max.likes > blog.likes ? max : blog
    }, blogs[0])
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
    
    const authorCounts = _.countBy(blogs, 'author') // This is a dictionary with the author as the key and the number of blogs as the value   
    const authors = _.map(authorCounts, (count, author) => ({ author, count }))    
    return _.maxBy(authors, 'count')
  }

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
   
    const authorLikes = _.groupBy(blogs, 'author') // This is a dictionary with the author as the key and the blogs as the value
    const authors = _.map(authorLikes, (likes, author) => ({ author, likes: _.sumBy(likes, 'likes') }))
    return _.maxBy(authors, 'likes')
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }