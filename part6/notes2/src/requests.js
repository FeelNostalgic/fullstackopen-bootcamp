import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes' 

export const getNotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createNote = (newNote) =>
  axios.post(baseUrl, newNote).then(res => res.data)

export const updateNote = (id, newNote) =>
  axios.put(`${baseUrl}/${id}`, newNote).then(res => res.data)