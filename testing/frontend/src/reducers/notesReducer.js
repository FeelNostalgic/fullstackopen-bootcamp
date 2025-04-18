import { createSlice } from '@reduxjs/toolkit'
import notesService from '../services/notes'

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload)
    },
    toggleImportance(state, action) {      
      const updatedNote = action.payload
      const note = state.find(note => note.id === updatedNote.id)
      note.important = updatedNote.important
    },
    setNote(state, action) {
      return action.payload
    }
  }
})

export const { appendNote, toggleImportance, setNote } = notesSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await notesService.getAll()
    dispatch(setNote(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await notesService.create(content)
    dispatch(appendNote(newNote))
  }
}

export const toggleImportanceOfNote = (note) => {
  return async (dispatch) => {
    const updateObject = {...note, important: !note.important}
    const updatedNote = await notesService.update(note.id, updateObject)
    dispatch(toggleImportance(updatedNote))
  }
}

export default notesSlice.reducer