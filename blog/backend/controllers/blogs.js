const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (!deletedBlog) {
        return response.status(404).end()
    }

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)
    if (!blog) {        
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter