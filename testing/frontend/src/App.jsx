import { useState, useEffect } from 'react'
import Note from './components/Note'
import Button from './components/Button'
import { Header } from './components/Headers'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import NoteForm from './components/NoteForm'
import Togglable from './components/Toggleable'
import noteService from './services/notes'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState({ message: null, type: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) //user token

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      noteService.setToken(user.token)
      setUser(user)
      fetchNotes()
    }
  }, [])

  const fetchNotes = async () => {
    const initialNotes = await noteService.getAll()
    setNotes(initialNotes)
  }

  useEffect(() => {
    if (user) {
      fetchNotes()
    } else {
      setNotes([])
    }
  }, [user])

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
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ message: 'Successfully logged in', type: 'success' })
    } catch (exception) {
      setNotification({ message: 'wrong credentials', type: 'error' })
    }
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important } // ...note => All note with important changed

    try {
      const updatedNote = await noteService.update(id, changeNote)
      setNotes(notes.map(n => n.id !== id ? n : updatedNote))
    } catch (exception) {
      setNotification({ message: 'Note was already removed from server', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
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

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel='new note'>
        <NoteForm onSubmit={addNote} handleChange={handleNoteChange} value={newNotes} />
      </Togglable>
    )
  }

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div>
      <Header text='Notes' />
      <Notification message={notification.message} type={notification.type} />

      {
        user === null
          ? loginForm()
          : <div>
            <UserInfo user={user} handleLogout={handleLogout} />
            {noteForm()}
          </div>
      }

      {user !== null &&
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
        </div>}
      <Footer />
    </div>
  )
}

export default App