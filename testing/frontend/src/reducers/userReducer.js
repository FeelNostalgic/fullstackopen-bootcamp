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
      //
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

export default notesSlice.reducer