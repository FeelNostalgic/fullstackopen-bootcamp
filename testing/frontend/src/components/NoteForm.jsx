import { Header2 } from "./Headers"

import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <Header2 text='Create a new note' />

      <form onSubmit={addNote} >
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
          placeholder='write note content here'
          id='note-input'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm