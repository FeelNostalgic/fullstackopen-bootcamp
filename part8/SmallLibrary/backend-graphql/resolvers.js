const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const User = require('./models/user')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({}).populate('author')
        return books
      }

      if (!args.author) { // Only genres
        return await Book.find({
          genres: args.genre
        }).populate('author');
      }

      if (!args.genre) { // Only author 
        const author = await Author.findOne({ name: args.author })
        return await Book.find({
          author: author._id
        }).populate('author');
      }

      return await Book.find({ // Both
        author: args.author,
        genres: args.genre
      }).populate('author');
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({}).populate('author')
      const genres = books.map(book => book.genres)
      return Array.from(new Set(genres.flat()))
    }
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
    
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
    
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          await new Author({ name: args.author }).save()
        }
      } catch (error) {
        throw new GraphQLError('Creating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error: error.message
          }
        })
      }
    
      const author = await Author.findOne({ name: args.author })

      try {
        const book = new Book({ ...args, author: author._id })
        const savedBook = await book.save()
        savedBook.author = author
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
        return savedBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error: error.message
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      return await author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, password: args.password })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'test') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers