import mongoose from 'mongoose'

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
    default: null
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)