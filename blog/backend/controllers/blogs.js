const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET: get all blogs
blogRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

// POST: create a new blog
blogRouter.post('', async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user)

    if(!user){
        return response.status(401).json({ error: 'unauthorized' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

// DELETE: delete a blog
blogRouter.delete('/:id', async (request, response) => {        
    const user = await User.findById(request.user)
    
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).end()
    }

    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (!deletedBlog) {
        return response.status(404).end()
    }

    response.status(204).end()
})

// PUT: update a blog to like   
blogRouter.put('/:id', async (request, response) => {
    const { user, title, author, url, likes } = request.body

    const userObject = await User.findById(user)

    const blog = await Blog.findById(request.params.id)
    if (!blog) {        
        return response.status(404).end()
    }

    // if (blog.user.toString() !== user.id.toString()) {
    //     return response.status(401).json({ error: 'unauthorized' })
    // }
    
    blog.user = userObject;    
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter