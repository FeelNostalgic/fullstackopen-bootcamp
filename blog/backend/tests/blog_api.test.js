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

    describe('viewing a specific blog', () => {
        //
    })
})

after(async () => {
    await mongoose.connection.close()
  })
