import { useState, useEffect, useRef } from 'react'
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
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'

import './index.css'

const App = () => {
  const dispatch = useDispatch()

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
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

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const newNote = await noteService.create(noteObject)
    setNotes(notes.concat(newNote))
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      dispatch(showNotification(`Successfully logged in`, 'success', 5))
    } catch (exception) {
      dispatch(showNotification(`wrong credentials`, 'error', 5))
    }
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important } // ...note => All note with important changed

    try {
      const updatedNote = await noteService.update(id, changeNote)
      setNotes(notes.map(n => n.id !== id ? n : updatedNote))
    } catch (exception) {
      dispatch(showNotification(`Note was already removed from server`,'error', 5))
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
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    )
  }

  const noteFormRef = useRef()

  const noteForm = () => {
    return (
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
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
      <Notification />

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