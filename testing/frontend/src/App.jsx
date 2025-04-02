import { useState, useEffect } from 'react'
import Note from './components/Note'
import Button from './components/Button'
import { Header } from './components/Headers'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNotes, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) //user token

  useEffect(() => {
    noteService
      .getAll() // getAll is a function that returns a promise
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const handleNoteChange = (event) => {
    setNewNotes(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNotes,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        // console.log(response)
        setNotes(notes.concat(returnedNote))
        setNewNotes('')
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important } // ...note => All note with important changed
    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote)) // replace the old note with the updated note
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, 2025</em>
      </div>
    )
  }

  if (!notes) {
    return null
  }

  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const noteForm = () => {  
    return (
    <form onSubmit={addNote}>
      <input value={newNotes} placeholder='write note content here' onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    )
  }

  return (
    <div>
      <Header text='Notes' />
      <Notification message={errorMessage} />

      {
        user === null
          ? loginForm()
          : <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
      }

      <div>
        <Button onClick={() => setShowAll(!showAll)} text={showAll ? 'Show important' : 'Show all'} />
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default App