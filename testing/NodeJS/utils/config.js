require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.TEST_MONGODB_URI

// const MONGODB_URI = process.env.NODE_ENV === 'test'
//     ? process.env.TEST_MONGODB_URI
//     : process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
}

module.exports = { MONGODB_URI, PORT }