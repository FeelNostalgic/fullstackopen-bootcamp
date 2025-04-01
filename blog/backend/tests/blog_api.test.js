const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

describe('when there are same notes saved initally', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    const token = await helper.loginUser(
      helper.initialUsers[0].username,
      helper.initialUsers[0].password
    )

    await api.get('/api/blogs')
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const token = await helper.loginUser(
      helper.initialUsers[0].username,
      helper.initialUsers[0].password
    )

    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('verify that the unique identifier property is named id, not _id', async () => {
    const token = await helper.loginUser(
      helper.initialUsers[0].username,
      helper.initialUsers[0].password
    )

    const response = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
    response.body.forEach(blog => {
      assert(blog.id)
      assert(!blog._id)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.title)
      assert(contents.includes('Test Blog'))
    })

    test('If likes is not provided, it defaults to 0', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const newBlog = {
        title: 'Test Blog 2',
        author: 'Test Author 2',
        url: 'https://test2.com',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('if title is missing, it is not added to the database', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const newBlog = {
        author: 'Test Author 3',
        url: 'https://test3.com',
        likes: 15
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if url is missing, it is not added to the database', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const newBlog = {
        title: 'Test Blog 4',
        author: 'Test Author 4',
        likes: 20
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if user is not logged in', async () => {
      const newBlog = {
        title: 'Test Blog 5',
        author: 'Test Author 5',
        url: 'https://test5.com',
        likes: 25
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('fails with status code 404 if id is invalid', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

      const blogsAtStart = await helper.blogsInDb()
      const invalidId = '5a3d5ce6777b2b2b2b2b2b2b'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 401 if user is not authorized', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[1].username,
        helper.initialUsers[1].password
      )
      
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

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
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

      const newBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      assert.strictEqual(newBlog.title, 'Updated Blog')
      assert.strictEqual(newBlog.author, 'Updated Author')
      assert.strictEqual(newBlog.url, 'https://updated.com')
      assert.strictEqual(newBlog.likes, 30)
    })

    test('fails with status code 404 if id is invalid', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[0].username,
        helper.initialUsers[0].password
      )

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
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 401 if user is not authorized', async () => {
      const token = await helper.loginUser(
        helper.initialUsers[1].username,
        helper.initialUsers[1].password
      )
      
      const blogsAtStart = await helper.blogsInDb()

      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
