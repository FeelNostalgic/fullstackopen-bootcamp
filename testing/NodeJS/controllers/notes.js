const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// GET: Get all notes
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

// POST: Create a new note
notesRouter.post('/', async (request, response,) => {
  const body = request.body
  const user = await User.findById(request.user)

  if (!user) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const note = new Note({
    content: body.content,
    important: body.important,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

// GET: Get a note by id
notesRouter.get('/:id', async (request, response,) => {
  const user = await User.findById(request.user)
  const note = await Note.findById(request.params.id)

  if (!note) {
    return response.status(404).end()
  }

  if (note.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  response.json(note)
})

notesRouter.delete('/:id', async (request, response) => {
  const user = await User.findById(request.user)

  const note = await Note.findById(request.params.id)
  if (!note) {
    return response.status(404).end()
  }

  if (note.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// PUT: Update a note (important field)
notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  const user = await User.findById(request.user)

  const note = await Note.findById(request.params.id)
  if (!note) {
    return response.status(404).end()
  }

  if (note.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  note.content = content
  note.important = important

  const updatedNote = await note.save()

  return response.status(200).json(updatedNote)
})

module.exports = notesRouter