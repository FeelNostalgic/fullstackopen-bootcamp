import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Note from './components/Note'
import Button from './components/Button'
import { Header } from './components/Headers'
import Notification from './components/Notification'
import Footer from './components/Footer'
import TogglableLoginForm from './components/TogglableLoginForm'
import UserInfo from './components/UserInfo'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeNotes, createNote, toggleImportanceOfNote } from './reducers/notesReducer'

import './index.css'

const App = () => {
  const dispatch = useDispatch()

  const notes = useSelector(({ notes }) => notes)

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
    dispatch(initializeNotes())
  }
  
  useEffect(() => {
    if (user) {
      fetchNotes()
    } 
  }, [user])

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const newNote = await noteService.create(noteObject)
    dispatch(createNote(newNote))
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

  const toggleImportanceOf = (note) => {
    dispatch(toggleImportanceOfNote(note))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

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
          ? <TogglableLoginForm handleLogin={handleLogin} />
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
                toggleImportance={() => toggleImportanceOf(note)}
              />
            )}
          </ul>
        </div>}
      <Footer />
    </div>
  )
}

export default App