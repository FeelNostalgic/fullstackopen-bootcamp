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

            await api
            .post('/api/blogs')
            .send(newBlog)
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

        test('if title is missing, it is not added to the database', async()=>{
            const newBlog = {
                author: 'Test Author 3',
                url: 'https://test3.com',
                likes: 15
            }

            await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('if url is missing, it is not added to the database', async()=>{
            const newBlog = {
                title: 'Test Blog 4',
                author: 'Test Author 4',
                likes: 20
            }

            await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async()=>{
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
        })

        test('fails with status code 404 if id is invalid', async()=>{
            const blogsAtStart = await helper.blogsInDb()
            const invalidId = '5a3d5ce6777b2b2b2b2b2b2b'

            await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(404)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
        })
    })

    describe('updating a blog', () => {
        test('succeeds with status code 200 if id is valid', async()=>{
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlog = {
                title: 'Updated Blog',
                author: 'Updated Author',
                url: 'https://updated.com',
                likes: 30
            }

            await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
            
            const newBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
            assert.strictEqual(newBlog.title, 'Updated Blog')
            assert.strictEqual(newBlog.author, 'Updated Author')
            assert.strictEqual(newBlog.url, 'https://updated.com')
            assert.strictEqual(newBlog.likes, 30)
        })

        test('fails with status code 404 if id is invalid', async()=>{
            const blogsAtStart = await helper.blogsInDb()
            const invalidId = '5a3d5ce6777b2b2b2b2b2b2b'

            const updatedBlog = {
                title: 'Updated Blog',
                author: 'Updated Author',
                url: 'https://updated.com',
                likes: 30
            }

            await api
            .put(`/api/blogs/${invalidId}`)
            .send(updatedBlog)
            .expect(404)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
  })
