const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const { log } = require('node:console')

describe('when there are same notes saved initally', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('verify that the unique identifier property is named id, not _id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            assert(blog.id)
            assert(!blog._id)
        })
    })

    describe('addition of a new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: 'Test Blog',
                author: 'Test Author',
                url: 'https://test.com',
                likes: 10
            }

            await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
            
            const contents = blogsAtEnd.map(n => n.title)
            assert(contents.includes('Test Blog'))
        })

        test('If likes is not provided, it defaults to 0', async()=>{
            const newBlog = {
                title: 'Test Blog 2',
                author: 'Test Author 2',
                url: 'https://test2.com',
            }
            
            const response =await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.likes, 0)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
  })
