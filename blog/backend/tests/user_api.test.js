const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const bcryptjs = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash(helper.initialUsers[0].password, 10)
    const user = new User({ username: helper.initialUsers[0].username, passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode (400) and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode (400) and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'test User',
      password: 'ds'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode (400) and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'test User',
      password: 'dsrgfdgh'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('when logging in', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcryptjs.hash(helper.initialUsers[0].password, 10)
    const user = new User({ username: helper.initialUsers[0].username, passwordHash })

    await user.save()
  })

  test('succeeds with correct credentials', async () => {

    const response = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(response.body.token)
    assert.strictEqual(response.body.username, helper.initialUsers[0].username)
  })

  test('fails with incorrect credentials', async () => {
    const loginData = {
      username: helper.initialUsers[0].username,
      password: 'incorrectPassword'
    }

    const response = await api
      .post('/api/login')
      .send(loginData)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('invalid username or password'))
  })

  test('create blog succeeds with valid token', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 10
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, 1)
    assert.strictEqual(response.body.title, newBlog.title)
    assert.strictEqual(response.body.author, newBlog.author)
    assert.strictEqual(response.body.url, newBlog.url)
    assert.strictEqual(response.body.likes, newBlog.likes)
    const userId = await helper.userId(loginResponse.body.username)
    assert.strictEqual(response.body.user.toString(), userId.toString())
  })
})

after(async () => {
  await mongoose.connection.close()
})