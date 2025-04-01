const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '67ec253bb91c488ea63b8ba0'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '67ec253bb91c488ea63b8ba0'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '67ec253bb91c488ea63b8ba0'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '67ec253bb91c488ea63b8ba0'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '67ec253bb91c488ea63b8ba0'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '67ec253bb91c488ea63b8ba0'
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'root',
    password: 'sekret'
  },
  {
    username: 'testuser',
    name: 'Test User',
    password: 'testpassword'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userId = async (username) => {
  const user = await User.findOne({ username })
  return user._id
} 

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',

  })
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const loginUser = async (username, password) => {
    const loginData = {
        username,
        password
    }

    const result = await api
        .post('/api/login')
        .send(loginData)
        .expect(200)

    return result.body.token
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers, 
  userId,
  loginUser
}